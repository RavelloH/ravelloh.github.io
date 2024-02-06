function main() {
    if (docCookies.getItem('usertoken')) {
        pjaxLoad(`/platform/user?uid=${token.read('uid')}`)
        return
    }
    if (docCookies.getItem('username')) {
        document.querySelector('#login-username').value = docCookies.getItem('username')
    }
    fetch(`${platformUrl}api/check`).then((response) => response.json())
    .then((data) => {
        if (data.code == 200) {
            switchElementContent('#platform-id', data.inner.id)
            document.querySelector('#login-button').classList.remove('block')
            document.querySelector('#login-button').onclick = ()=>(signin())
            switchElementContent('#login-button span', '登录')
        } else {
            showError('平台运行异常，请稍后重试')
            switchElementContent('#login-button span', '平台运行异常，刷新页面以重试')
            switchElementContent('#platform-id', 'ERROR')
            document.querySelector('#login-button').onclick = ()=>(pjaxLoad('#'))
        }
    }).catch((e)=> {
        showError('无法与登录服务器建立连接，请稍后重试', 12000)
        switchElementContent('#login-button span', '刷新页面以重试')
        switchElementContent('#platform-id', 'ERROR')
        document.querySelector('#login-button').onclick = ()=>(pjaxLoad('#'))
    });
}

function signin() {
    switchElementContent('#login-button span',
        '<span class="circle-loader"></span>')
    document.querySelector('#login-button').classList.add('block')
    document.querySelector('#login-button').onclick = null

    if (!document.querySelector('#login-username').value) {
        switchElementContent('#login-button span',
            '请输入用户名/邮箱')
        setTimeout(() => {
            document.querySelector('#login-button').classList.remove('block')
            document.querySelector('#login-button').onclick = ()=>(signin())
            switchElementContent('#login-button span', '登录')
        }, 5000)
        return false
    }


    if (!document.querySelector('#login-password').value) {
        switchElementContent('#login-button span',
            '请输入密码')
        setTimeout(() => {
            document.querySelector('#login-button').classList.remove('block')
            document.querySelector('#login-button').onclick = ()=>(signin())
            switchElementContent('#login-button span', '登录')
        }, 5000)
        return false
    }

    if (!document.querySelector('#login-time').value) {
        switchElementContent('#login-button span',
            '请输入登录保持时间')
        setTimeout(() => {
            document.querySelector('#login-button').classList.remove('block')
            document.querySelector('#login-button').onclick = ()=>(signin())
            switchElementContent('#login-button span', '登录')
        }, 5000)
        return false
    }

    fetch(platformUrl + 'api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: objectToForm({
            account: document.querySelector('#login-username').value,
            password: document.querySelector('#login-password').value,
            expiredTime: document.querySelector('#login-time').value+'h',
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.code == 200) {
            token.write(data.inner.token)
            switchElementContent('#login-button span', '登录成功，即将跳转')
            // 处理本地存储
            if (document.querySelector('#check-keep-token-refresh').checked) {
                setting('EnableTokenAutorefresh', 'true')
            }
            if (document.querySelector('#remember-account').checked) {
                docCookies.setItem('username', data.inner.username)
            }

            setTimeout(() => {
                if (analyzeURL(window.location.href, 'redirect') !== '') {
                    pjaxLoad(analyzeURL(window.location.href, 'redirect'));
                } else {
                    pjaxLoad(`/platform/user?uid=${token.read('uid')}`)
                }
            },
                3000)
        } else {
            switchElementContent('#login-button span', data.message)
        }
    })
    .catch((e) => {
        switchElementContent('#login-button span', '无法与登录服务器建立连接')
    })
    .finally(() => {
        setTimeout(() => {
            document.querySelector('#login-button').classList.remove('block')
            document.querySelector('#login-button').onclick = ()=>(signin())
            switchElementContent('#login-button span', '登录')
        }, 5000)
    });
}

function checkPassword() {
    if (
        parseInt(document.querySelector('#login-password').value.length) < 6 ||
        parseInt(document.querySelector('#login-password').value.length) > 4096
    ) {
        // document.querySelector('#login-password').setAttribute('invalid', '')
        switchElementContent('#password-tip div', '密码应介于6-4096位之间')
        return false
    }
    // document.querySelector('#login-password').removeAttribute('invalid');
    switchElementContent('#password-tip div', '密码 / Password')
    return true

}