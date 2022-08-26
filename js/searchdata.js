var SearchResult = "{\"articles\":[{\"title\":\"静态站实现全站搜索\",\"path\":\"/articles/20220825/\",\"time\":\"2022-08-25\",\"text\":\"
全站搜索这一功能我想加入到我的博客中不是一年两年的事了。但因自己现在弃用Hexo转而自己做博客，这两年搜索这个功能就一直未能实现。
最近自己偶然有新想法，就给实现了。效果还不错，现在搭配GithubActions使用，可以实现新文章自动索引，实现了自动化。


要想充分体验，还是自己去试试的好。转到Articles索引页

要想在静态页搜索，就要自己创建索引。这里使用python来创建一个JSON，存储全站文章信息：


#-*-coding:utf-8-*-
##使用有问题请到github.com/ravelloh/RPageSearch提ISSUE
###Author:RavelloH
####LICENCE:MIT
#####RPageSearch
importos
frombs4importBeautifulSoup

##设置目标
target='./articles/'#目录位置
layers=1#遍历层数
targettype='html'#文件后缀名(只支持html)

main_structure_head='{&quot;articles&quot;:['
main_structure_end=']}'
inner_structure_1='{&quot;title&quot;:&quot;'
inner_structure_2='&quot;,&quot;path&quot;:&quot;'
inner_structure_3='&quot;,&quot;time&quot;:&quot;'
inner_structure_4='&quot;,&quot;text&quot;:&quot;'
inner_structure_5='&quot;}'


##打开目标目录
targetfile=[]
foriinos.listdir(target):
if'.'notini:
forkinos.listdir(target+i):
iftargettypeink:
targetfile.append(target+i+'/'+k)

##按时间顺序排序
targetfilenum=[]
foriintargetfile:
targetfilenum.append(i[11:19])
targetfilenum.sort(reverse=True)
targetfile=[]
foriintargetfilenum:
targetfile.append('./articles/'+str(i)+'/index.html')

##解析重构目标文件
inner_structure_cache=[]
inner_structure_text=''
foriintargetfile:
inner_structure_text=''
withopen(i,'r')asf:
filecontent=BeautifulSoup(f.read(),'html.parser')
textlist=filecontent.find_all(name='p')
title=filecontent.find_all(name='h2')
titlelen=len(title)
length=len(textlist)
forjinrange(length):
inner_structure_text=inner_structure_text+textlist[j].get_text()
time=i[-19:-11]
time=time[0:4]+'-'+time[4:6]+'-'+time[6:8]
title=title[titlelen-1]
path=i[1:][:-10]
inner_structure_text=inner_structure_text.replace('','').replace('','').replace('&quot;','&quot;')
inner_structure_all=inner_structure_1+str(title.get_text())+inner_structure_2+str(path)+inner_structure_3+str(time)+inner_structure_4+inner_structure_text+inner_structure_5
inner_structure_cache.append(inner_structure_all)

##重构完整JSON
main_structure=main_structure_head
foriininner_structure_cache:
main_structure=main_structure+i+','
main_structure=main_structure[:-1]+main_structure_end
total_str='varSearchResult=&quot;'+main_structure.replace('&quot;','&quot;')+'&quot;'
print(total_str)
#写入JSON#文件
withopen('./js/searchdata.js','w+')as#1:
f1.write(total_str)



上述代码实现了将articles目录下所有文件夹中以.html后缀结尾的文件中的p标签中文字提取出来，并顺便提取h2的文章标题。不过因为python中直接使用os.dirlist扫出的文件名是乱序，为方便后续排序还需要按照时间顺序排序，其中因为我的文章存储方式是以时间排序的，如这篇文章的存储结构就是/articles/20220825/inxex.html，因为时间可以直接从文件夹中读出，时间排序比较方便，7行就搞定了，如果是其余方式也同理。上述代码运行后，得出的应该是类似于如下结构的json:



{
&quot;articles&quot;:[{
&quot;title&quot;:&quot;文章标题&quot;,&quot;path&quot;:&quot;相对路径&quot;,&quot;time&quot;:&quot;更新时间&quot;,&quot;text&quot;:&quot;所有正文&quot;
},{
&quot;title&quot;:&quot;文章标题&quot;,&quot;path&quot;:&quot;相对路径&quot;,&quot;time&quot;:&quot;更新时间&quot;,&quot;text&quot;:&quot;所有正文&quot;
},{
&quot;title&quot;:&quot;文章标题&quot;,&quot;path&quot;:&quot;相对路径&quot;,&quot;time&quot;:&quot;更新时间&quot;,&quot;text&quot;:&quot;所有正文&quot;
}]
}



这样全站搜索的json就生成完成了，为了方便引用，上述代码最后会将这个json改为js格式，并转义&quot;字符。
这样，就可以在后续处理搜索时直接引用js，其中json存储在变量SearchResult中。

有了json，搜索就只需在前端实现了。这样可以脱离服务器的限制，唯一限制速度的是访客的设备性能。
但因为这里只是简单的字符串搜索，性能需求并不大，下面我写的代码虽说并没有做到极限优化，但也通过多层次搜索降低了一部分运算量，可以做到实时搜索输入数据。
以下是HTML与JavaScript代码。当然，这跟我博客上的不一样，博客上还加入了一些css过渡之类的，不过本篇重点也不是css，如果有需求可自行到博客articles页F12看看。博客源代码在github，见此。


<divclass='searchbox'></span>
<formclass=&quot;searchbox&quot;onSubmit=&quot;returncheck();&quot;autocomplete=&quot;off&quot;>
<inputtype=&quot;text&quot;placeholder=&quot;从所有文章内检索...&quot;name=&quot;search&quot;oninput=&quot;searchtext()&quot;onpropertychange=&quot;searchtext()&quot;>
<buttontype=&quot;button&quot;id='searchbutton'><spanclass=&quot;iconfontminiicon-search&quot;></span></button>
<divclass=&quot;resultlist&quot;id=&quot;resultlist&quot;>
<i>-搜索-</i><hr><palign=&quot;center&quot;>
输入关键词以在文章标题及正文中查询
</p>
<hr><ahref=&quot;https://github.com/ravelloh/RPageSearch&quot;>SearchpoweredbyRavelloH'sRPageSearch</a>
</div>
</form>
</div>




letinput=document.querySelector(&quot;input[type='text']&quot;);
letresult=document.getElementById('resultlist')
letbutton=document.getElementById('searchbutton')

obj=JSON.parse(SearchResult);
functionsearchtext(){
result.innerHTML=input.value;
if(input.value==''){
result.innerHTML='<i>-搜索-</i><hr>'+'<palign=&quot;center&quot;>输入关键词以在文章标题及正文中查询</p><hr>'
}

//标题搜索
resultcount=0;
resultstr='';
varresulttitlecache=newArray()
for(i=0;i<obj.articles.length;i++){
if(obj.articles[i]['title'].includes(input.value)==true){
resulttitlecache.unshift(obj.articles[i]['title'])
resultcount++;
}
}

//标题搜索结果展示
if(resultcount!==0&&resultcount!==obj.articles.length){
for(i=0;i<resulttitlecache.length;i++){
for(j=0;j<obj.articles.length;j++){
if(obj.articles[j]['title']==resulttitlecache[i]){
titlesearchresult='<h4><ahref=&quot;'+obj.articles[j][&quot;path&quot;]+'&quot;class=&quot;resulttitle&quot;>'+obj.articles[j]['title'].replace(newRegExp(input.value,'g'),'<mark>'+input.value+'</mark>')+'</a></h4><em>-标题匹配</em><pclass=&quot;showbox&quot;>'+obj.articles[j]['text'].substring(0,100)+'</p>'
resultstr=titlesearchresult+'<hr>'+resultstr
}
}
result.innerHTML='<i>&quot;'+input.value+'&quot;</i><hr>'+resultstr;
}
}

//正文搜索
varresulttextcache=newArray()
for(i=0;i<obj.articles.length;i++){
if(obj.articles[i]['text'].includes(input.value)==true){
resulttextcache.unshift(obj.articles[i]['text'])
resultcount++;
}
}

//正文搜索结果计数
vartargetname=newArray()
vartargetscore=newArray()
if(resulttextcache.length!==0&&input.value!==''){
for(i=0;i<resulttextcache.length;i++){
for(j=0;j<obj.articles.length;j++){
if(obj.articles[j]['text']==resulttextcache[i]){
targetname.unshift(obj.articles[j]['title'])
targetscore.unshift(obj.articles[j]['text'].match(RegExp(input.value,'gim')).length)
}
}
}
}

//排序相关选项
vartargetscorecache=targetscore.concat([]);
varresultfortext='';
vartextsearchresult=''
targetscorecache.sort(function(a,b){
returnb-a
})
for(i=0;i<targetscorecache.length;i++){
for(j=0;j<targetscore.length;j++){
if(targetscorecache[i]==targetscore[j]){
console.log('文章排序:'+targetname[j])
for(k=0;k<obj.articles.length;k++){
if(obj.articles[k]['title']==targetname[j]){
//确认选区
textorder=obj.articles[k]['text'].indexOf(input.value)-15;
while(textorder<0){
textorder++
}

resultfortext='<h4><ahref=&quot;'+obj.articles[k][&quot;path&quot;]+'&quot;class=&quot;resulttitle&quot;>'+obj.articles[k]['title']+'</a></h4><em>-'+targetscorecache[i]+'个结果</em><pclass=&quot;showbox&quot;>...'+obj.articles[k]['text'].substring(textorder,textorder+100).replace(newRegExp(input.value,'g'),'<mark>'+input.value+'</mark>')+'</p>'
textsearchresult=textsearchresult+'<hr>'+resultfortext;
}
}
}
}
}

//无效结果安排
if(resultcount!==obj.articles.length){
if(resultcount==0){
result.innerHTML='<i>&quot;'+input.value+'&quot;</i><hr><palign=&quot;center&quot;>没有找到结果</p>'
}
}
//整合
result.innerHTML=result.innerHTML.substring(0,result.innerHTML.length-4)+textsearchresult.substring(0,textsearchresult.length-4)+'<hr><ahref=&quot;https://github.com/ravelloh/RPageSearch&quot;class=&quot;tr&quot;>SearchpoweredbyRavelloH\'sRPageSearch</a>'
}


当然，上述代码比复杂，接下来我会分步来说。
前3行没什么好说的，找到对应的元素，方便后期处理。
第5行从生成的json内获取数据，之后从第六行开始是主函数，搭配html表单使用，效果是当输入时实时搜索。
7-10行判断输入框是否为空，若空替换为默认提示词。
12-21行遍历json中存储的标题，查找是否有相关字词，若有，为resultcount+1，并将完整标题加入到列表resulttitlecache中
23-34行用于展示搜索结果，条件是resultcount不为0（要能找得到结果才继续，节省运算量）且不为json中文章总数（若输入一些字符后全部删除，默认输入了&quot;&quot;，所有文章都会有反馈。），里面是两个遍历组合，第一个遍历resulttitlecache中的有结果的标题，第二个遍历总数据，搜索到契合后即可确认总数据的路径、时间、正文、标题信息，然后整合存储到resultstr中。这样因为我们在python生成数据时就是按时间顺序排列的，在这里遍历也是时间最近的结果优先。同时，第一层遍历将搜索到的resultstr中的信息整合到html中展示结果的result元素(一个id为resultlist的div)中。这里也用js替换高亮了信息里面的关键字，会给匹配的字符添加到一个mark标签内（默认黄底白字，可以用css改，比如我的博客就改成了蓝底另外加了个圆角），另外也会截取正文前100字符用于展示，但是因为字符宽度不一显示起来不整齐，要解决可以用css限制行数，css我会放在文章下面。
36-43行与12-21行相似，将搜索匹配的结果存储在resulttextcache中，不在赘述。
45-57行也类似于23-34行，为两个嵌套的遍历，不同的是这个不写入，而是记录搜索结果中含关键词的总数，方便后续排序。具体做法是创建两个列表targetname和targetscore，targetname记录resulttextcache中的正文内容，targetscore记录对应含关键词的数量。这两个是一一对应的关系，比如targetname的第二项所含的关键词总数就等于targetscore第二项记录的数字。
59-84行花了大功夫排序，首先创建一个targetscore的备份targetscorecache，但是要深拷贝*关乎js数组知识，若只是简单的vara=b则ab共享存储位置，换句话说就是a变b也变，对一维数组可以简单的使用a=b.concat([])来解决，之后以数组sort方式排序，此时targetscorecache为降序排列，targetscore保持原顺序不变，之后套三层遍历（应该还能继续优化，但我懒得做了，又不是不能用，性能影响也不大）前两层嵌套和之前搜索匹配的23-34、45-57相同，不过这次匹配的是targetscorecache与targetscore，之后再从总数据到json种找到正文匹配的文章，获取到对应的path、title、time和text，然后是类似于23-34到写入过程，这里值得注意有三点，一是这次高亮的是text中的结果，2是这里也会用上作为排序依据的targetscore，在标题下方展示相应的结果数（见最上方用于展示的图片），三是这里生成的html代码不直接写入而是存储到变量textsearchresult中，方便最后整合的时候删掉多余的hr标签。
86-91给上面接底，如果啥也没找到就替换为相应的文本。
最后92-93用来整合、合并标题搜索与正文搜索的内容，顺便加上个poweredby的后缀，这里你也可以替换为你自己的文字，或者干脆连前面的hr标签也一起删掉，但我还是希望能留下个注释标明出处。
上述就是js进行本地运算的过程，至于若想达到和我博客相同的效果，css是必不可少的，这里简单罗列一下css及相关的js。


<!--CSS-->
form.searchboxinput[type=text]{
color:#c6c9ce;
height:30px;
padding:5px;
font-size:12px;
float:left;
width:80%;
background:#000000;
border:1pxsolid#1e1e1e;
border-radius:10px0px0px10px;
}

form.searchboxbutton{
height:30px;
float:left;
width:20%;
padding:5px;
background:#1e1e1e;
color:white;
font-size:12px;
border:none;
cursor:pointer;
border:1pxsolid#1e1e1e;
border-radius:0px10px10px0px;
text-align:center;
line-height:10px;
margin:auto;
}

form.searchboxbutton:hover{
background:#0b7dda;
transition:background0.2s;
}

form.searchbox::after{
content:&quot;&quot;;
clear:both;
display:table;
}
.resultlist{
top:-20px;
height:0;
width:100%;
transition:height0.4s;
background:#000000;
color:#c6c9ce;
}
.resultlist#active{
border-radius:10px;
border:1pxsolid#1e1e1e;
height:40%;
}
.resultlist*{
margin:2px;
}
.resulttitle{
color:#ffffff;
font-size:1em;
}

#info{
opacity:1;
transition:opacity0.4s;
}
#hidden{
opacity:0;
}

.fc{
text-align:center;
}
.title{
max-width:45%;
}
.tr{
text-align:right
}
mark{
background-color:#0b7dda;
border-radius:4px;
color:#fff;
margin:0;
}
.showbox{
display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:2;
overflow:hidden;
margin:2px!important
}




//JS添加到刚才所有JS的最上方
functioncheck(){
returnfalse;
}

functionmaxfor(arr){
varlen=arr.length;
varmax=-Infinity;
while(len--){
if(arr[len]>max){
max=arr[len];
}
}
returnmax;
}

//下面的和刚才的代码有部分重复，替换就行
letinput=document.querySelector(&quot;input[type='text']&quot;);
letresult=document.getElementById('resultlist')
letinfos=document.getElementById('info')
letbutton=document.getElementById('searchbutton')
input.addEventListener(&quot;focus&quot;,e=>{
result.style.height='40%'
result.style.overflow='auto'
result.style.padding='3px'
infos.id='hidden'
})
input.addEventListener(&quot;blur&quot;,e=>{
result.style.height='0'
result.style.overflow='hidden'
result.style.padding='0'
infos.id='info'
})
//下方应为obj的定义



上述就是目前这个版本搜索的实现，理论上来说这个和前面一篇文章一样，内容都是关于伪动态的，因为搜索这个功能到我写这篇文章为止，都是先存数据库，然后在搜索时拿去数据库比对，之后返回结果，像我这样把搜索过程全搬到用户端的估计全互联网我还是第一人。不过这样也有利有弊，最大的利是节省了服务器，而弊端就是搜索速度依靠用户端设备算力，另外就是在内容太多时需要先将json下载到本地才能搜索（这是必要的，但是可以通过预加载等方式提前这个过程加快）
做了这几篇文章，可以简单归纳伪动态：用其他脚本处理整合数据，前端用js处理。这里整合的载体是json，前面的EverydayNews载体是固定的文件夹结构，PSGameSpider则是混合，将数据直接写入定时更新生成的html的js部分数组里，读取则是靠固定文件夹结构。
说回主角，我把它在Github立了个项，放在Github@RavelloH/RPageSearch中，现在没有时间不会再去更新它，但是以后(也可能是很久以后)会陆续升级一下，加入模糊搜索等功能。

\"},{\"title\":\"论静态页中伪动态的实现\",\"path\":\"/articles/20220708/\",\"time\":\"2022-07-08\",\"text\":\"
最近半年里，我先后完成了PSGameSpider与EverydayNews
这两个项目，它们都是基于GithubPages的静态页，但其中都多多少少可以实现动态站的部分功能，如识别网址后的？xxx=xxx并作出反馈（EverydayNews），或者动态根据Github中的仓库内容渲染页面（PSGameSpider）。
不过，这实质上也并没有改变这作为静态站的本质，因为这不符合动态站“个性化为不同用户展示页面”的特点。
实际上，“伪动态”这个名词是类比“伪静态”而产生的，但不同于伪静态中可以用服务器正则判断并生成网页，静态站中想要实现部分动态站的效果就只能靠在用户的设备上执行脚本，并使用已有的静态资源做出反馈。
下面是其中一部分功能的实现效果及方法:

页面自动生成详见Github:PSGameSpider。

JavaScript中自带有识别当前页面的链接的方法window.location.search，可以用来识别当前页面的链接。
local.search可以识别链接中带?及其后的内容。除此之外，还有下列类似的获取页面url的方法：
*注:下列列表中的内容可以点击执行以查看效果。为了充分展示所有功能，建议先点击此处补充全链接内容。
window.location.href-识别整个链接
window.location.origin-识别协议+域名
window.location.protocol-识别协议
window.location.host-
识别域名+端口*当端口为默认值80时返回空字符串
window.location.hostname-识别域名
window.location.port-
识别端口*当端口为默认值80时返回空字符串
window.location.pathname-识别页面路径
window.location.hash-识别#及其内容
window.location.search-识别？及其内容


这里可以运用此方法实现？xxx=xxx的识别：


//JavaScript

varlocal=window.location.search;
if(local.substring(0,6)=='?text='){
vartext=local.substring(6);
alert(text);
}else{
alert('没有text参数');
}

>>运行<<




上述代码中实现了一个识别当前页面的链接的方法，如果识别的链接中包含了一个参数，这个参数的名字是text，那么就会弹出一个提示框，提示这个参数的值。
但是此方法也有局限性，就是只能识别一个参数，如果链接中有多个参数，那么就会带着后面的参数一起输出。
为了解决这个问题，我们可以从参数的分割符&下手，当存在&时截断数据:



//JavaScript

varlocal=window.location.search;
if(local.substring(0,6)=='?text='){
vartext=local.substring(6);
vartext2=text.substring(0,text.indexOf('&'));
alert(text2);
}else{
alert(&quot;没有text参数&quot;);
}

>>运行<<




不过这样还不够优雅，如果我们需要的参数没有排在第一位，那么我们可以使用正则表达式来实现：



//JavaScript

varlocal=window.location.search;
varreg=/text=(.*)/;
varresult=reg.exec(local);
if(result!=null){
alert(result[1]);
}else{
alert(&quot;没有text参数&quot;);
}

>>运行<<




通过对上面的代码的进一步加工，我们就能做到分别提取参数的值，并且可以解决多个参数的问题。
下面是一个完整的例子：




//JavaScript

//判断有没有&quot;？&quot;
varlocal=window.location.search;
if(local.substring(0,1)=='?'){

//如果只有一个参数，那么直接弹出提示框
if(local.substring(1).indexOf('&')==-1){
alert(local.substring(1));
}else{

//遍历替换所有&为?
varlocal=window.location.search;
varreg=/&/g;
varresult=reg.exec(local);
if(result!=null){
local2=local.replace(reg,&quot;?&quot;);
}
//删除相邻的?
varreg2=/\?{2,}/;
varresult2=reg2.exec(local2);
if(result2!=null){
varlocal3=local2.replace(/\?{2,}/,&quot;?&quot;);
}else{
varlocal3=local2;
//在最后加入一个?,方便截取
varlocal4=local3+&quot;?&quot;;
console.log(local4);
//以?为分割符，循环遍历截取每一个参数并存储在数组中
varreg3=/\?/;
varresult3=reg3.exec(local4);
vararr=[];
while(result3!=null){
varlocal5=local4.substring(0,local4.indexOf(&quot;?&quot;));
arr.push(local5);
local4=local4.substring(local4.indexOf(&quot;?&quot;)+1);
result3=reg3.exec(local4);
}
//删除arr中的空元素
varreg4=/^\s*$/;
for(vari=0;i<arr.length;i++){
if(reg4.exec(arr[i])!=null){
arr.splice(i,1);
i--;
}
}
//遍历arr数组，并输出=前面的值与=后面的值
for(vari=0;i<arr.length;i++){
varreg5=/=/;
varresult5=reg5.exec(arr[i]);
if(result5!=null){
varlocal6=arr[i].substring(0,arr[i].indexOf(&quot;=&quot;));
varlocal7=arr[i].substring(arr[i].indexOf(&quot;=&quot;)+1);
alert(&quot;参数&quot;+local6+&quot;的值为&quot;+local7);
}
}
}
}else{
alert(&quot;没有参数&quot;);
}

>>运行<<





页面自动构建


当然，自动构建代码需要平台支持，这就不可避免的需要用到服务器。
但是在本地无服务器的情况下，也可以上云，比如Github的Actions以及其他类似的服务。
下面以GithubActions为例，演示如何使用GithubActions来自动构建页面：

什么是GithubActions?
简而言之，GithubActions就是一个云端的持续集成服务器。想要使用Github，只需要将相应代码传至Github仓库，在其中配置Actions即可。
Actions的配置也很简单，只需在仓库内新建.github/workflows/main.yml文件即可。
在此yml文件中，可以设置触发方式（如定时、每次提交、每次修改），以及触发条件（如提交的文件、提交的分支）。
另外要执行的代码内容，依选择的平台的命令行格式来执行即可。比如要执行一Python脚本，可以在yml文件中写：


jobs:
build:
runs-on:ubuntu-latest#设置运行环境
steps:
-name:Checkout
uses:actions/checkout@v2
-name:'Gitset'
run:|
gitinit
gitpull
-name:'SetupPython'
uses:actions/setup-python@v1
with:
python-version:3.7#v3
-name:'Installrequirements'
run:|
pipinstallwget
pipinstallbs4
pipinstallurllib3#安装依赖
-name:'Working'
run:
pythonupdate.py#运行主程序


其余有关Actions的内容不再赘述，详见GithubActionsDocs。
怎么利用GithubActions
因为GithubActions是一个云端的持续集成服务器，所以可以在Github上配置Actions，然后在Github上提交代码，就可以自动构建页面。
但这并不能达到自动构建页面的目的。想要自动部署，目前有两种方式：
1.GithubActions+爬虫
这个方法能实现全自动的内容抓取、分析、部署。下面以Python为例，讲讲大致的过程：
首先需要明确要爬取的内容类型，如图片、文字、视频等。针对这些，如果网站需要展示相应的内容，那么就有使用原内容\下载至Github后展示两种思路。
展示原内容的，即爬虫只爬取资源链接（或文字），然后写入页面；
下载至Github，即爬虫爬取链接后下载内容，并使用Git将下载的内容提交至仓库，然后使用GithubPages展示。

下载至Github的爬虫


前者适合于网站的内容比较简单的，后者适合于网站的内容比较复杂的，并且前者不能存档资源，后者可以存档并备份资源
如只是简单的复制内容，如爬取相应网站的css、js、html等并部署到自身以绕过封锁，或者是类似于新闻等的信息展示，那么可以使用第一种方式；
如果在网站中需要存档资源方便查询，或者是源网站为非静态导致链接更换频繁，那么可以使用第二种方式。
不过两者都有一定的局限性，例如前者不下载资源可能在网站结构改变或者动态站内容更新时，无法自动更新，而后者可能会导致资源冗余等问题。
所以最好的方法是两者结合，并以不同资源类型而分情况使用。
比如下载图像、文件等资源，并将相应文字资源直接写入html，然后配套修改链接即可。
例我的项目为Github:RavelloH/PSGameSpider，其中包含了一个爬虫，用于爬取游戏资源。
此项目的GithubActions配置如下：


#YAML

name:update
on:
schedule:
-cron:'305/12***'#每日更新
watch:
types:[started]
workflow_dispatch:
jobs:
build:
runs-on:ubuntu-latest#运行环境
steps:
-name:Checkout
uses:actions/checkout@v2
-name:'Gitset'
run:|
gitinit
gitpull
-name:'SetupPython'
uses:actions/setup-python@v1
with:
python-version:3.7#v3
-name:'Installrequirements'
run:|
pipinstallwget
pipinstallbs4
pipinstallurllib3#安装依赖
-name:'Working'
run:
pythonupdate.py#运行主程序
-name:'Page'
run:
pythonwebpage.py#运行主程序
-name:'EnglishWorking'
run:
pythonen-update.py#运行主程序
-name:'EnPage'
run:
pythonen-webpage.py#运行主程序
-name:TOC
uses:technote-space/toc-generator@v4
-name:Recordtime
run:echo`date`>date.log

-name:Commitfiles
run:|
gitdiff
gitconfig--localuser.email&quot;hyh20060327@qq.com&quot;
gitconfig--localuser.name&quot;RavelloH&quot;
gitadd-A
gitcommit-m&quot;`date'+%Y-%m-%d%H:%M:%S'`&quot;||exit#动态提交信息
gitstatus
gitpush-f
env:
GITHUB_TOKEN:${{secrets.GITHUB_TOKEN}}


上述内容的逻辑是定时\STAR时激活爬虫，先下载资源，后通过python中的os.listdir()获取本地文件信息，后通过f.write()写入到HTML中。

另外，也可以使用另一种方法:
爬虫爬取到资源后，前端通过JavaScript将固定命名的资源文件引入，这样也能实现资源的动态更新。
不过这对资源形式的要求较高，要求每天只能有固定数（或者换句话说，资源的数目是可预判的）的资源类型。
使用这种方法的项目详见EverydayNews

前端JS代码实现



2.API+前端
这部分没什么好说的，看具体API返回的格式就行。
返回text的就直接document.write()*外联拖慢加载速度或者.innerHTML()写入即可；
返回json的就需要使用JSON.parse()解析，然后再写入即可。（当然要是格式稳定，也可以切分字符串）
返回图片的也可以直接img引入即可，但是要注意图片的格式，要是png的话，要加上data:image/png;base64,。
这部分最难的是找API，使用起来也很方便，看具体文档就行。



原创内容使用知识共享署名-非商业性使用-相同方式共享4.0(CCBY-NC-ND
4.0)
协议授权。






上述代码中实现了一个识别当前页面的链接的方法，如果识别的链接中包含了一个参数，这个参数的名字是text，那么就会弹出一个提示框，提示这个参数的值。
但是此方法也有局限性，就是只能识别一个参数，如果链接中有多个参数，那么就会带着后面的参数一起输出。
为了解决这个问题，我们可以从参数的分割符&下手，当存在&时截断数据:

不过这样还不够优雅，如果我们需要的参数没有排在第一位，那么我们可以使用正则表达式来实现：

通过对上面的代码的进一步加工，我们就能做到分别提取参数的值，并且可以解决多个参数的问题。
下面是一个完整的例子：

当然，自动构建代码需要平台支持，这就不可避免的需要用到服务器。
但是在本地无服务器的情况下，也可以上云，比如Github的Actions以及其他类似的服务。
下面以GithubActions为例，演示如何使用GithubActions来自动构建页面：

什么是GithubActions?
简而言之，GithubActions就是一个云端的持续集成服务器。想要使用Github，只需要将相应代码传至Github仓库，在其中配置Actions即可。
Actions的配置也很简单，只需在仓库内新建.github/workflows/main.yml文件即可。
在此yml文件中，可以设置触发方式（如定时、每次提交、每次修改），以及触发条件（如提交的文件、提交的分支）。
另外要执行的代码内容，依选择的平台的命令行格式来执行即可。比如要执行一Python脚本，可以在yml文件中写：


jobs:
build:
runs-on:ubuntu-latest#设置运行环境
steps:
-name:Checkout
uses:actions/checkout@v2
-name:'Gitset'
run:|
gitinit
gitpull
-name:'SetupPython'
uses:actions/setup-python@v1
with:
python-version:3.7#v3
-name:'Installrequirements'
run:|
pipinstallwget
pipinstallbs4
pipinstallurllib3#安装依赖
-name:'Working'
run:
pythonupdate.py#运行主程序


其余有关Actions的内容不再赘述，详见GithubActionsDocs。
怎么利用GithubActions
因为GithubActions是一个云端的持续集成服务器，所以可以在Github上配置Actions，然后在Github上提交代码，就可以自动构建页面。
但这并不能达到自动构建页面的目的。想要自动部署，目前有两种方式：
1.GithubActions+爬虫
这个方法能实现全自动的内容抓取、分析、部署。下面以Python为例，讲讲大致的过程：
首先需要明确要爬取的内容类型，如图片、文字、视频等。针对这些，如果网站需要展示相应的内容，那么就有使用原内容\下载至Github后展示两种思路。
展示原内容的，即爬虫只爬取资源链接（或文字），然后写入页面；
下载至Github，即爬虫爬取链接后下载内容，并使用Git将下载的内容提交至仓库，然后使用GithubPages展示。

下载至Github的爬虫


前者适合于网站的内容比较简单的，后者适合于网站的内容比较复杂的，并且前者不能存档资源，后者可以存档并备份资源
如只是简单的复制内容，如爬取相应网站的css、js、html等并部署到自身以绕过封锁，或者是类似于新闻等的信息展示，那么可以使用第一种方式；
如果在网站中需要存档资源方便查询，或者是源网站为非静态导致链接更换频繁，那么可以使用第二种方式。
不过两者都有一定的局限性，例如前者不下载资源可能在网站结构改变或者动态站内容更新时，无法自动更新，而后者可能会导致资源冗余等问题。
所以最好的方法是两者结合，并以不同资源类型而分情况使用。
比如下载图像、文件等资源，并将相应文字资源直接写入html，然后配套修改链接即可。
例我的项目为Github:RavelloH/PSGameSpider，其中包含了一个爬虫，用于爬取游戏资源。
此项目的GithubActions配置如下：


#YAML

name:update
on:
schedule:
-cron:'305/12***'#每日更新
watch:
types:[started]
workflow_dispatch:
jobs:
build:
runs-on:ubuntu-latest#运行环境
steps:
-name:Checkout
uses:actions/checkout@v2
-name:'Gitset'
run:|
gitinit
gitpull
-name:'SetupPython'
uses:actions/setup-python@v1
with:
python-version:3.7#v3
-name:'Installrequirements'
run:|
pipinstallwget
pipinstallbs4
pipinstallurllib3#安装依赖
-name:'Working'
run:
pythonupdate.py#运行主程序
-name:'Page'
run:
pythonwebpage.py#运行主程序
-name:'EnglishWorking'
run:
pythonen-update.py#运行主程序
-name:'EnPage'
run:
pythonen-webpage.py#运行主程序
-name:TOC
uses:technote-space/toc-generator@v4
-name:Recordtime
run:echo`date`>date.log

-name:Commitfiles
run:|
gitdiff
gitconfig--localuser.email&quot;hyh20060327@qq.com&quot;
gitconfig--localuser.name&quot;RavelloH&quot;
gitadd-A
gitcommit-m&quot;`date'+%Y-%m-%d%H:%M:%S'`&quot;||exit#动态提交信息
gitstatus
gitpush-f
env:
GITHUB_TOKEN:${{secrets.GITHUB_TOKEN}}


上述内容的逻辑是定时\STAR时激活爬虫，先下载资源，后通过python中的os.listdir()获取本地文件信息，后通过f.write()写入到HTML中。

另外，也可以使用另一种方法:
爬虫爬取到资源后，前端通过JavaScript将固定命名的资源文件引入，这样也能实现资源的动态更新。
不过这对资源形式的要求较高，要求每天只能有固定数（或者换句话说，资源的数目是可预判的）的资源类型。
使用这种方法的项目详见EverydayNews

前端JS代码实现



2.API+前端
这部分没什么好说的，看具体API返回的格式就行。
返回text的就直接document.write()*外联拖慢加载速度或者.innerHTML()写入即可；
返回json的就需要使用JSON.parse()解析，然后再写入即可。（当然要是格式稳定，也可以切分字符串）
返回图片的也可以直接img引入即可，但是要注意图片的格式，要是png的话，要加上data:image/png;base64,。
这部分最难的是找API，使用起来也很方便，看具体文档就行。
\"},{\"title\":\"Python实现网络爬虫\",\"path\":\"/articles/20220323/\",\"time\":\"2022-03-23\",\"text\":\"
最近在参与一个数据收集的项目，需要大量获取图像及链接等，用人力显然是完成不过来了，
于是索性就做个爬虫，一劳永逸了。
这里因为项目比较小，对效率要求不大，就选择了使用Python而不是C语言。
(也因为Python用起来更省事)
本文所含代码可直接跳转#代码查看

效果如上图，即输入网页链接，自动提取所含图片链接，
同时自动转化相对路径为绝对路径，方便下载。
最后每行一个print出来，方便统一存储/下载。


Python在爬虫方面已经十分成熟，这里引用第三方库BeautifulSoup与urllib，若无这些库请下载:
依赖库准备完后，引用：此处引用random以及build_opener与ProxyHandler是为了后续反爬，
(毕竟默认UA是Python.Urllib)
接着配置UA池与IP代理池，防止被反爬(若项目规模较小可忽略此步)
其中，ip_list推荐使用Github@jhao104/proxy_pool开源的IP代理池。*代码中所列IP均为演示作用，若需应用请自行设置
在此就完成了UA与IP的随机分配，反爬基本完成
不过反爬归反爬，也请自觉遵守robot协议，合理利用爬虫
下一步，发出请求：
到这里为止，整个请求结束，之后用BeautifulSoup解析:
*下面已用bs代指beautifulsoup

这里也给出不含反爬的请求：
(基本同上，唯一的区别是直接用urlopen打开链接)

到这里我们已经成功将网页中所含的所有img标签以列表形式存储在了变量pic_info中，
接下来遍历输出即可：

上图套了四个if-else，作用分别是检测是否有http头、是否为内嵌base64图片、是否以//简写路径、是否使用相对路径，
到这里为止，整个程序就结束了
整个示例程序可分为引用-配置-请求-分析-输出5个部分，
除了爬取图片，也可将上面的pic_info=obj.find_all('img')改成其他标签，
比如改成meta可爬取简介，也可在特定站点内通过zaifind_all内添加对应的class(class_=&quot;xxx&quot;)及id(id_=&quot;xxx&quot;)来获取对应标签内的信息，
实现更多功能。
完整版基础版此文章共含2个附件，分别对应基础版与完整版。imgspider.py-0.73kb预览|下载imgspider-pro.py-1.76kb预览|
下载
\"},{\"title\":\"JS递归遍历伪数组\",\"path\":\"/articles/20220206/\",\"time\":\"2022-02-06\",\"text\":\"
最近在用getElementsByTagName获取标签内容时，发现与getElementById/ClassName等不同，
直接document.getElementsByTagName('').id修改页面中所有标签的id时没有反应...
console.log输出一下，发现输出的是[li,li,li,li,li]这种形式的伪数组(集合)

这里既然是以集合的方式输出，就可以用逐项穷举的方式将其中的项挨个执行。
首先储存这个集合:*这里以li为例


varlis=document.getElementsByTagName('li')


然后用for循环递归:


for(vari=0;
i<lis.length;
i++){
console.log(lis[i])}


这里直接输出了，在这个时候就可以用document.等

给页面内所有span加入加载特效：


/*CSS*/
span{
position:relative;
animation-name:startloadingspan;
animation-duration:0.8s;
}

@keyframesstartloadingspan{
0%{
opacity:0;
}
100%{
opacity:1;
}
}

span#active{
position:relative;
animation-name:endloadingspan;
animation-duration:0.8s
animation-fill-mode:forwards;
}

@keyframesendloadingspan{
0%{
opacity:1;
}
100%{
opacity:0;
}
}

//JavaScript
window.onbeforeunload=function(e){
document.getElementById(&quot;text&quot;).id=&quot;active&quot;;
varspans=document.getElementsByTagName('span');
for(vari=0;i<spans.length;i++){
(spans[i]).id=&quot;active&quot;;}
}



最近忙着升级主题，但是确实没有时间...这坑要慢慢填
这是2022的第一篇文章，但估计之后很长一段时间内也不会更多少博客，可能这也是2022的最后一篇文章了吧
新年快乐。
\"},{\"title\":\"Minecraft命令实现在线统计\",\"path\":\"/articles/20210719/\",\"time\":\"2021-07-19\",\"text\":\"


首先要实现在线时间统计，需要先定义时间。
所以在这里需要先创建几个稍后要用到的计分板：
/scoreboardobjectivesaddtimetickdummy
/scoreboardobjectivesaddtimesdummy
/scoreboardobjectivesaddtimemdummy
/scoreboardobjectivesaddtimehdummy
/scoreboardobjectivesaddtimeddummy
顺次显示的是秒-分-时-天。

计时器的思路是这样的：
使用循环命令方块为timetick加分，则每秒可以增加20（每秒命令方块运行20次）
当timetick为20时，为times加1并设置timetick为0。
当times为60时，为timem加1并设置times为0。
当timem为60时，为timeh加1并设置timem为0。
...以此类推。

所以在这里需要使用命令方块组+目标选择器进行运算:
循环:scoreboardplayersadd@atimetick1
连锁:scoreboardplayersadd@a[scores={timetick=20..}]times1
连锁:scoreboardplayersset@a[scores={timetick=20..}]timetick0
连锁:scoreboardplayersadd@a[scores={times=60..}]timem1
连锁:scoreboardplayersset@a[scores={times=60..}]times0
连锁:scoreboardplayersadd@a[scores={timem=60..}]timeh1
连锁:scoreboardplayersset@a[scores={timem=60..}]timem0
连锁:scoreboardplayersadd@a[scores={timeh=24..}]timed1
连锁:scoreboardplayersset@a[scores={timeh=24..}]timeh0


最后再加一个title用于显示即可
循环：executeas@aat@sruntitle@pactionbar
[{&quot;text&quot;:&quot;在线时间:&quot;,&quot;color&quot;:&quot;green&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;score&quot;:{&quot;objective&quot;:&quot;timed&quot;,&quot;name&quot;:&quot;@p&quot;},&quot;color&quot;:&quot;gray&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;text&quot;:&quot;天&quot;,&quot;color&quot;:&quot;gold&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;score&quot;:{&quot;objective&quot;:&quot;timeh&quot;,&quot;name&quot;:&quot;@p&quot;},&quot;color&quot;:&quot;gray&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;text&quot;:&quot;小时&quot;,&quot;color&quot;:&quot;gold&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;score&quot;:{&quot;objective&quot;:&quot;timem&quot;,&quot;name&quot;:&quot;@p&quot;},&quot;color&quot;:&quot;gray&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;text&quot;:&quot;分&quot;,&quot;color&quot;:&quot;gold&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;score&quot;:{&quot;objective&quot;:&quot;times&quot;,&quot;name&quot;:&quot;@p&quot;},&quot;color&quot;:&quot;gray&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false},{&quot;text&quot;:&quot;秒&quot;,&quot;color&quot;:&quot;gold&quot;,&quot;bold&quot;:false,&quot;italic&quot;:false,&quot;underlined&quot;:false,&quot;strikethrough&quot;:false,&quot;obfuscated&quot;:false}]
（考虑到多人游戏的情况这里添加了一个execute用于保证显示正确的对象）


当我们搭建好全部命令方块并运行后，不难发现虽然计时器正常，但却没有显示值为0的项目:

这是因为未被赋值的计分板项目默认不显示，需要手动设置为0：
/scoreboardplayersset@ptimes0
/scoreboardplayersset@ptimem0
/scoreboardplayersset@ptimeh0
/scoreboardplayersset@ptimed0
之后即可正常使用。

\"},{\"title\":\"CSS与JS实现页面过渡\",\"path\":\"/articles/20210705/\",\"time\":\"2021-07-05\",\"text\":\"因为自己最近在忙这个博客的建设，所以自己就想给这个blog做一个切换页面时的过渡。可在网上却都没什么符合这blog主题的，于是自己动手丰衣足食，自己就做了现在的这种效果。
效果如此blog中的切换效果，即：

进入新页面时，除顶栏及底栏外的其余文字部分从屏幕左侧飞入，

离开此页面时，除顶栏及底栏外的其余文字部分从屏幕左侧飞出。



考虑到需要有对进入\离开页面的检测，这里需要用到JavaScript。对样式的调整，我选择了使用CSS动画。

这样还有个优点：因为需要让动画结束后元素停留在结束位置，所以先使用动画，将元素从left:-xxxpx移动到left:0px即可。

而对于离开页面，则需要使用window.onbeforeunload参数检测是否离开页面，然后触发动画。

触发动画的方式，这里采用的是通过JS改变HTML内容的属性id，配合CSS选择器实现。


值得注意的是，因为网络原因可能会导致一个页面的加载时间变长，这时若离开页面的动画播放完毕则会重新回到原位置。

要解决这个问题，最好的办法是在css动画属性中加入&quot;animation-fill-mode:forwards;&quot;,让动画结束时元素停在结束位置
\"},{\"title\":\"新主题上线\",\"path\":\"/articles/20210701/\",\"time\":\"2021-07-01\",\"text\":\"
最近做好了这个新主题并应用到博客，
因为之前的那个主题是基于Hexo的，自己现在也不太想用，干脆自己做了个
这个主题虽说比较简陋，但毕竟是自己做出来的，各方面都很了解，比之前那个四零八乱的好多了。

这个主题连同blog放在github了>>Github
\"},{\"title\":\"反转药水效果\",\"path\":\"/articles/20200816/\",\"time\":\"2020-08-16\",\"text\":\"由于一些神奇的BUG特性，高等级效果将会使原效果被反转，而这就使得了一些原版不存在的操作变成了可能。例如，创造模式的玩家不免疫增益效果，只免疫负面效果，而这就使得了如果可以给予创造玩家一种增益效果但实际是负面效果，也是能对创造模式玩家造成伤害的。
除此以外，对跳跃提升药水运用相同的原理也有奇效玩家将会无法跳跃
另外，这个药水所带来的伤害也高的离谱：也是因为未知原因，死亡后不掉落掉落物*开启死亡掉落的情况下\"}]}"