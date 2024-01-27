function log(...args) {
  console.log(`\x1b[38m[QQ纯享模式]\x1b[0m`, ...args);
}
let macOSstyle=`right: 12px!important;left: inherit;top: 4px!important;position: fixed;app-region: no-drag;z-index: 99;cursor: pointer;pointer-events: all;right: 12px !important;`
if (LiteLoader.os.platform != "darwin") {
  macOSstyle=''
}
const BTN_HTML = `
<div id="brevityBtn" style="transform:rotate(268deg); ${macOSstyle}" role="button" tabindex="0" aria-label="侧栏收缩">
  <i class="q-icon " id="brevity-btn-icon" style="--c346ed76: inherit; --a7eb2210: 16px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"> <polyline points="18 15 12 9 6 15"></polyline></svg>
  </i>
</div>
`
function isCssSectionExist(sectionId) {
  return !!document.querySelector('style#' + sectionId);
}

function insertCssSection(sectionId, cssCode) {
  if (!isCssSectionExist(sectionId)) {
    var style = document.createElement('style');
    style.id = sectionId;
    style.appendChild(document.createTextNode(cssCode));
    document.head.appendChild(style);
  }
}

function removeCssSection(sectionId) {
  try {
    document.querySelector('style#' + sectionId).remove()
  } catch (error) {

  }

}

var customCssCode = `
/* -----   隐藏式侧栏 ------   */

.contact-top-bar .top-bar__search{
  padding-left: 28px!important;
}
.contact-top-bar .top-bar__search .q-input__inner{
  padding-left: 12px!important;
}

.container .sidebar {
    position: absolute;
    left: -85px;
    width: 85px !important;
    transition: all .3s ease-in-out;
    overflow: visible;
    & * {
        overflow: visible !important;
    }
    z-index: 999;
    .sidebar-nav {
        width: 85px;
    }
    .sidebar__avatar {
        transform: scale(calc(32 / 36)) translateX(80px) translateY(-5px);
        transition: all .3s ease-in-out;
    }
   
}

.container .contact-top-bar {
    padding-left: 25px !important;
    .q-input__prefix {
        display: none !important;
    }
}
/**macOS***/
body[q-platform="darwin"] .container .contact-top-bar {
  padding-top: 35px!important;
}
body[q-platform="darwin"] .nostalgic-qq-icon{
    right: 12px!important;
    left: inherit;
    top: 4px;
}
body[q-platform="darwin"] .nostalgic-user-avatar{
    margin-top: 15px!important;
}
body[q-platform="darwin"] .sidebar__upper {
    padding-top: 34px!important;
}
/* ------------------- */
`;


const findFuncMenuInterval = setInterval(() => {
  // 获取功能菜单
  let areaMenu = document.querySelector('.window-control-area')
  if (LiteLoader.os.platform === "darwin") {
    areaMenu = document.querySelector('#app')

  }
  const funcMenu = document.querySelector('.func-menu')
  if (areaMenu && funcMenu) {
    clearInterval(findFuncMenuInterval)
    // 插入按钮
    areaMenu.insertAdjacentHTML('afterbegin', BTN_HTML)
    // 监听按钮点击
    const brevityBtn = document.querySelector('#brevityBtn')
    brevityBtn.addEventListener('click', () => {
      const brevityBtnStyle = document.querySelectorAll('.brevityBtnStyle')
      if (brevityBtnStyle.length !== 0) {
        brevityBtnStyle.forEach((item) => item.remove())
      } else {
        if (isCssSectionExist('BrevityBtn')) {
          removeCssSection('BrevityBtn')
          document.querySelector('#brevityBtn').style.transform = 'rotate(270deg)'
        } else {
          //兼容QQ怀旧模式插件
          // if(LiteLoader?.plugins?.nostalgic){
          //   insertCssSection('BrevityBtn', LiteLoader?.plugins?.nostalgic?.disabled?customCssCode:customCssCode2);
          // }else{
          //   insertCssSection('BrevityBtn', customCssCode);
          // }
          insertCssSection('BrevityBtn', customCssCode);
          document.querySelector('#brevityBtn').style.transform = 'rotate(180deg)'
        }
      }
    })
  }
}, 100)


