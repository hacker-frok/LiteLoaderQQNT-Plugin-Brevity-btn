
const DEMO_MODE_BTN_HTML = `
<div id="brevityBtn" role="button" tabindex="0" aria-label="侧栏收缩">
  <i class="q-icon vue-component" data-v-87bc705d="" style="--c346ed76: inherit; --a7eb2210: 16px;">
  <svg id="brevityBtnShow" fill="none" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5089" width="10" height="10" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path 
     fill-rule="evenodd"
     clip-rule="evenodd" 
     d="M696.743385 224.697665l-315.804981 288.422211 315.804981 288.494461a28.148621 28.148621 0 0 1 0 39.845904c-11.018133 10.945883-28.900021 10.945883-39.954279 0l-336.107246-306.990475c-5.888379-5.888379-8.344881-13.619135-8.019756-21.34989-0.36125-7.658506 2.131377-15.389261 8.019756-21.277641l336.107246-306.990475c11.018133-10.945883 28.900021-10.945883 39.954279 0a28.083596 28.083596 0 0 1 0 39.845905z"
     fill="currentColor" 
     ></path>
  </svg>
  <svg id="brevityBtnHide" style="display:none" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path 
    fill-rule="evenodd" 
    clip-rule="evenodd" 
    d="M839.58174 368.439145l-306.990475 336.793622c-5.852254 5.960629-13.619135 8.453256-21.349891 8.092005-7.658506 0.36125-15.389261-2.131377-21.27764-8.092005l-306.990475-336.793622c-10.945883-11.018133-10.945883-28.900021 0-40.026529a28.148621 28.148621 0 0 1 39.845904 0l288.422211 316.527481 288.494462-316.527481a28.148621 28.148621 0 0 1 39.845904 0c10.945883 11.126508 10.945883 29.008396 0 40.026529z"
    fill="currentColor" 
    ></path>
  </svg>
  </i>
</div>
`

const DEMO_MODE_BTN_STYLE_HTML = `
<style>
@media (prefers-color-scheme: light) {
  #brevityBtn i{
    color:var(--5f831aae);
  }
  #brevityBtn i:hover {
    color: var(--brand_standard) !important;
  }

}
@media (prefers-color-scheme: dark) {
  #brevityBtn i{
    color:var(--5f831aae)!important;
  }
  #brevityBtn i:hover {
    color: var(--brand_standard) !important;
  }
}
</style>
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
 
/* ------------------- */
`;

function iconSwitch(status) {
  try {
    document.getElementById('brevityBtnShow').style.display=status?'':'none'
    document.getElementById('brevityBtnHide').style.display=status?'none':''
  } catch (error) {

  }

}
const findFuncMenuInterval = setInterval(() => {
  // 获取功能菜单
  const areaMenu = document.querySelector('.window-control-area')
  const funcMenu = document.querySelector('.func-menu')
  if (areaMenu && funcMenu) {
    clearInterval(findFuncMenuInterval)
    // 插入按钮
    areaMenu.insertAdjacentHTML('afterbegin', DEMO_MODE_BTN_HTML)
    document.head.insertAdjacentHTML('beforeend', DEMO_MODE_BTN_STYLE_HTML)
    // 监听按钮点击
    const brevityBtn = document.querySelector('#brevityBtn')
    brevityBtn.addEventListener('click', () => {
      const brevityBtnStyle = document.querySelectorAll('.brevityBtnStyle')
      if (brevityBtnStyle.length !== 0) {
        brevityBtnStyle.forEach((item) => item.remove())
      } else {
        if (isCssSectionExist('BrevityBtn')) {
          removeCssSection('BrevityBtn')
          iconSwitch('show')
        } else {
          insertCssSection('BrevityBtn', customCssCode);
          iconSwitch('')
        }
      }
    })
  }
}, 100)


