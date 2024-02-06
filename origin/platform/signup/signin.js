function main() {
    if (docCookies.getItem('usertoken')) {
        pjaxLoad(`/platform/user?uid=${token.read('uid')}`)
        return
    }
    fetch(`${platformUrl}api/check`)
        .then((response) => response.json())
        .then((data) => {
        if (data.code == 200) {
            switchElementContent('#platform-id', data.inner.id)
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        } else {
            showError('平台运行异常，请稍后重试')
            switchElementContent('#signup-button span', '平台运行异常，刷新页面以重试')
            switchElementContent('#platform-id', 'ERROR')
            document.querySelector('#signup-button')
                .onclick = () => (pjaxLoad('#'))
        }
    })
        .
    catch ((e) => {
        showError('无法与注册服务器建立连接，请稍后重试', 12000)
        switchElementContent('#signup-button span', '刷新页面以重试')
        switchElementContent('#platform-id', 'ERROR')
        document.querySelector('#signup-button')
            .onclick = () => (pjaxLoad('#'))
    });
}

function signin() {
    switchElementContent('#signup-button span',
        '<span class="circle-loader"></span>')
    document.querySelector('#signup-button')
        .classList.add('block')
    document.querySelector('#signup-button')
        .onclick = null

    if (!document.querySelector('#signup-username')
        .value) {
        switchElementContent('#signup-button span',
            '请输入用户名')
        setTimeout(() => {
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        }, 5000)
        return false
    }


    if (!document.querySelector('#signup-password')
        .value) {
        switchElementContent('#signup-button span',
            '请输入密码')
        setTimeout(() => {
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        }, 5000)
        return false
    }

    if (!document.querySelector('#signup-email')
        .value) {
        switchElementContent('#signup-button span',
            '请输入邮箱')
        setTimeout(() => {
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        }, 5000)
        return false
    }

    if (!checkEmail()) {
        switchElementContent('#signup-button span',
            '邮箱格式不正确')
        setTimeout(() => {
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        }, 5000)
        return false
    }

    if (!checkUsername()) {
        switchElementContent('#signup-button span',
            '用户名格式不正确')
        setTimeout(() => {
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        }, 5000)
        return false
    }

    if (!checkPassword()) {
        switchElementContent('#signup-button span',
            '密码格式不正确')
        setTimeout(() => {
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        }, 5000)
        return false
    }


    fetch(platformUrl + 'api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: objectToForm({
            username: document.querySelector('#signup-username')
                .value,
            nickname: document.querySelector('#signup-username')
                .value,
            email: document.querySelector('#signup-email')
                .value,
            password: document.querySelector('#signup-password')
                .value,
            allowMessage: document.querySelector('#check-allow-send-messages')
                .checked
        }),
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.code == 200) {
            switchElementContent('#signup-button span', '注册成功，即将跳转至登录')
            setTimeout(() => {
                if (analyzeURL(window.location.href, 'redirect') !== '') {
                    pjaxLoad('/platform/signin?redirect=' + analyzeURL(window.location.href, 'redirect'));
                } else {
                    pjaxLoad('/platform/signin')
                }
            },
            3000)
        } else {
            switchElementContent('#signup-button span', data.message)
        }
    })
        .
    catch ((e) => {
        console.error(e)
        switchElementContent('#signup-button span', '无法与注册服务器建立连接')
    })
        .
    finally(() => {
        setTimeout(() => {
            document.querySelector('#signup-button')
                .classList.remove('block')
            document.querySelector('#signup-button')
                .onclick = () => (signin())
            switchElementContent('#signup-button span', '注册')
        }, 5000)
    });
}

function checkPassword() {
    if (
    parseInt(document.querySelector('#signup-password')
        .value.length) < 6 || parseInt(document.querySelector('#signup-password')
        .value.length) > 4096) {
        // document.querySelector('#signup-password').setAttribute('invalid', '')
        switchElementContent('#password-tip div', '密码应介于6-4096位之间')
        return false
    }
    // document.querySelector('#signup-password').removeAttribute('invalid');
    switchElementContent('#password-tip div', '密码 / Password')
    return true

}

function checkUsername() {
    if (
    parseInt(document.querySelector('#signup-username')
        .value.length) < 5 || parseInt(document.querySelector('#signup-username')
        .value.length) > 10) {
        // document.querySelector('#signup-password').setAttribute('invalid', '')
        switchElementContent('#username-tip div', '用户名应介于5-10位之间')
        return false
    }
    if (!/^[a-z0-9_]+$/.test(document.querySelector('#signup-username')
        .value)) {
        switchElementContent('#username-tip div', '用户名应仅由英文小写字母及数字或下划线组成')
        return false
    }
    // document.querySelector('#signup-password').removeAttribute('invalid');
    switchElementContent('#username-tip div', '用户名 / Username')
    return true
}

function checkEmail() {
    if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(document.querySelector('#signup-email')
        .value)) {
        switchElementContent('#email-tip div', '邮箱格式错误')
        return false
    }
    switchElementContent('#email-tip div', '邮箱 / Email')
    return true
}