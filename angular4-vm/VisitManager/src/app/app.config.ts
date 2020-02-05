
export const APP_CONFIG = {
    serverEnvironments: ["static", "stage", "prod", "uat"],
  apiMode: 'static',
    appName: 'Visit ExplorerV1',
    httpTimeout: 60000,
    localDatabaseName: 'Visit Manager App',
    databaseStoreName: 'dataStore',
    privacyLinkURL: 'https://www.accenture.com/us-en/privacy-policy',
    contactUSEmailSubject: 'CVM Contact Us',

    hamburgerItems:[
      {title:'Select Visit', iconCls:'icon-selectvisit', routeLink:'/visit', show: false, queryParams:{isside: true}},
      {title:'Welcome', iconCls:'icon-welcome', routeLink:'/visit/welcomevisit', show: false},
      {title:'Check In / Bar Code', iconCls:'icon-checkin', routeLink:'/checkin', show: false},
      {title:'Point Of Contact', iconCls:'icon-poc', routeLink:'/visit/pointofcontact', show: false},
      {title:'Downloads', iconCls:'icon-downloads', routeLink:'/home/downloads', show: false},
      {title:'Important Links', iconCls:'icon-implinks', routeLink:'/visit/implinks', show: false},
      {title:'Logistics', iconCls:'icon-logistics', routeLink:'/logistics', show: false},
      {title:'Agenda', iconCls:'icon-agenda', routeLink:'/home', show: false},
      {title:'City Insights', iconCls:'icon-distance', routeLink:'/cityinsights', show: false},
      {title:'Meet the Presenters', iconCls:'icon-meetthepresenters', routeLink:'/visit/meetpresentor', show: false},
      {title:'Wi-Fi at Accenture', iconCls:'icon-wifi', routeLink:'/visit/wifiinfo', show: false},
      {title:'Image Gallery', iconCls:'icon-imagegallery', routeLink:'/gallery', show: false},
      {title:'Terms and Conditions', iconCls:'icon-termsconditions', routeLink:'/termsandcondition', queryParams:{isside: true}, show: false},
      {title:'Settings', iconCls:'icon-settings', routeLink:'/settings', queryParams:{isside: true}, show: true},
      {title:'Logout', iconCls:'icon-logout', routeLink:'', show: true}
    ],

    hamburgerVRItems: {
      title:'Virtual Reality',
      iconCls:'icon-settings',
      routeLink:'/virtual',
      show: true
    },

    checkInItems:[
      { iconCls: 'icon-checkin custom-checkin-icon', routeLink: '/checkin/home', isActive: false },
      { iconCls: 'icon-scanbarcode custom-barcode-icon', routeLink: '/checkin/scanbarcode', isActive: false },
      { iconCls: 'icon-registerlaptop custom-register-laptop-icon', routeLink: '/checkin/registerlaptop', isActive: false }
    ],


    downloadItems: [
      { iconCls: 'icon-visitcontent icon-custom-visit', routeLink: '/home/downloads/visitcontent', isActive: true },
      { iconCls: 'icon-sessioncontent icon-custom-session', routeLink: '/home/downloads/sessioncontent', isActive: true }
    ],

    downloadSideMenuItems: [
  		{ 'title': 'Download All', 'callbackText': 'downloadall' },
  		{ 'title': 'Delete All', 'callbackText': 'deleteall' }
  	],

    logisticsMenuItems: [
  		{ iconCls: 'icon-cardetails custom-checkin-icon', routeLink: '/logistics/cardetail', isActive: true },
      { iconCls: 'icon-dietarypreference custom-barcode-icon', routeLink: '/logistics/dietary', isActive: true },
      { iconCls: 'icon-safetyoverview custom-register-laptop-icon', routeLink: '/logistics/safety', isActive: true },
      { iconCls: 'icon-travelguide custom-register-laptop-icon', routeLink: '/logistics/travelguide', isActive: true },
      { iconCls: 'icon-visitorguide custom-register-laptop-icon', routeLink: '/logistics/visitorguide', isActive: true }
  	],

    storage_types: {
        'preread': 'preread',
        'session': 'session'
    },

    checkInProcessCamera: {
      width: 320,
      height: 320,
      quality: 50,
      direction: 1
    }

};
