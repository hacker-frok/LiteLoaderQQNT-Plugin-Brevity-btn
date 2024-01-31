const plugin_path = LiteLoader.plugins["brevity-btn"].path.plugin;
function log(...args) {
  console.log(`\x1b[31m[QQ纯享模式]\x1b[0m`, ...args);
}
let settingsConfig = await btnBrevity.getSettings();

let macOSstyle = `right: 12px!important;left: inherit;top: 4px!important;position: fixed;app-region: no-drag;z-index: 99;cursor: pointer;pointer-events: all;right: 12px !important;`
if (LiteLoader.os.platform != "darwin") {
  macOSstyle = ''
}
const BTN_HTML = `
<div id="brevityBtn" style="background: transparent;transition: all .3s ease-in-out; ${macOSstyle}" role="button" tabindex="0" aria-label="侧栏收缩">
  <i class="q-icon " id="brevity-btn-icon" >
   ${settingsConfig.icon}
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


const switchStatus = (status) => {
  if (status) {

    if (!isCssSectionExist('BrevityBtn')) {
      insertCssSection('BrevityBtn', customCssCode);
      document.querySelector('#brevityBtn').style.transform = 'rotate(-90deg)'
    }

  } else {

    if (isCssSectionExist('BrevityBtn')) {
      removeCssSection('BrevityBtn')
      document.querySelector('#brevityBtn').style.transform = 'rotate(0deg)'
    }

  }

}

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
    switchStatus(settingsConfig.mini)
    brevityBtn.addEventListener('click', () => {

      if (isCssSectionExist('BrevityBtn')) {
        removeCssSection('BrevityBtn')
        document.querySelector('#brevityBtn').style.transform = 'scaleX(1)'
        settingsConfig.mini = false
      } else {
        insertCssSection('BrevityBtn', customCssCode);
        document.querySelector('#brevityBtn').style.transform = 'scaleX(-1)'
        settingsConfig.mini = true
      }
      btnBrevity.setSettings(settingsConfig);
    })
  }
  //监听主进程发来的消息
  btnBrevity.updateSettings((event, config) => {
    settingsConfig.icon = config.icon
    const btn = document.querySelector('#brevityBtn')
    if (btn) {
      btn.innerHTML = `<i class="q-icon " id="brevity-btn-icon" >${config.icon}</div>`
    }
  });
}, 100)


// 打开设置界面时触发
export const onSettingWindowCreated = async view => {
  log('打开设置界面')
  try {
    //设置设置界面的图标
    settingsConfig = await btnBrevity.getSettings();
    document.querySelectorAll(".nav-item.liteloader").forEach(node => {
      //log(node.textContent)
      if (node.textContent === "QQ纯享模式") {
        node.classList.add("btnBrevity")
        node.classList.add('appearance')
        const htmlicon = `<svg t="1706663826169" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="15" height="15"><path d="M495.7952 770.176h46.523733v49.3824h-46.523733zM495.7952 676.309333h46.523733v49.3824h-46.523733zM495.7952 582.442667h46.523733v49.3824h-46.523733zM495.7952 377.642667h46.523733v49.3824h-46.523733zM495.7952 283.776h46.523733v49.3824h-46.523733zM495.7952 189.909333h46.523733v49.3824h-46.523733zM87.2192 52.693333l-25.6 0.375467v900.386133l17.066667 0.366934h99.9424v-46.5152h-2.2272V526.711467h0.008533v-46.532267h-0.008533V99.584h2.2272V53.0688h-2.2272l8.533333-0.375467zM212.7616 907.306667h49.3824v46.5152h-49.3824zM212.7616 53.0688h49.3824v46.5152h-49.3824zM915.848533 99.584v45.602133h46.532267V53.0688h-86.229333v46.5152zM876.151467 907.306667v46.5152h86.229333v-87.5776h-46.532267v41.0624zM306.628267 907.7248h49.3824v46.5152h-49.3824zM306.628267 53.486933h49.3824v46.506667h-49.3824zM400.494933 907.7248h49.3824v46.5152h-49.3824zM400.494933 53.486933h49.3824v46.506667h-49.3824zM542.318933 907.7248v-41.0624H495.786667v41.0624h-9.9584v46.5152h66.423466v-46.5152zM495.786667 99.9936v45.610667h46.532266v-45.610667h9.9328v-46.506667h-66.423466v46.506667zM596.770133 907.7248h49.3824v46.5152h-49.3824zM596.770133 53.486933h49.3824v46.506667h-49.3824zM690.6368 907.7248h49.3824v46.5152h-49.3824zM690.6368 53.486933h49.3824v46.506667h-49.3824zM784.503467 907.7248h49.3824v46.5152h-49.3824zM784.503467 53.486933h49.3824v46.506667h-49.3824zM915.8656 769.757867h46.5152v49.3824h-46.5152zM915.8656 675.8912h46.5152v49.3824h-46.5152zM915.8656 582.024533h46.5152v49.3824h-46.5152zM915.8656 377.224533h46.5152v49.3824h-46.5152zM915.8656 283.357867h46.5152v49.3824h-46.5152zM915.8656 189.4912h46.5152v49.3824h-46.5152zM203.8272 480.1792h49.3824v46.523733h-49.3824zM297.693867 480.1792h49.3824v46.523733h-49.3824zM391.560533 480.1792h49.3824v46.523733h-49.3824zM485.4272 480.1792v46.532267h10.368v11.246933h46.523733v-11.246933h9.9328v-46.532267h-9.9328v-11.5712h-46.523733v11.5712zM596.369067 480.1792h49.3824v46.523733h-49.3824zM690.235733 480.1792h49.3824v46.523733h-49.3824zM784.1024 480.1792h49.3824v46.523733h-49.3824zM867.618133 480.1792v46.532267h48.247467v10.8288h46.5152v-68.932267h-46.5152v11.5712z" ></path></svg>`
        node.querySelector(".q-icon.icon").insertAdjacentHTML('afterbegin', htmlicon)
      }
    })

    const html_file_path = `local:///${plugin_path}/src/settings/main.html`;

    view.innerHTML = await (await fetch(html_file_path)).text();

    const items = view.querySelectorAll(`.btnBrevity-icon-item`);
    let index = 0
    items.forEach(function (item) {
      index++
      if (settingsConfig.icon.indexOf(`btnBrevity-icon${index}"`) != -1||settingsConfig.icon.indexOf(`btnBrevity-icon${index}\\"`) != -1) {
        item.classList.add("btnBrevity-icon-item-select")
      }
      item.addEventListener('click', function (event) {
        items.forEach((item) => {
          item.classList.remove("btnBrevity-icon-item-select")
        })
        const isActive = event.currentTarget.classList.contains('btnBrevity-icon-item-select')
        if (!isActive) {
          event.currentTarget.classList.add("btnBrevity-icon-item-select")
          settingsConfig.icon = event.currentTarget.innerHTML;
          btnBrevity.setSettings(settingsConfig);
        }

      });
    });


  } catch (error) {
    log("[设置页面错误]", error);
  }
}
