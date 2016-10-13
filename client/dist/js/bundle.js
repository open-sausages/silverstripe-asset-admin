!function(e){function t(i){if(n[i])return n[i].exports
var r=n[i]={exports:{},id:i,loaded:!1}
return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={}
return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict"
n(1),n(43)},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}var r=n(2),l=n(3),o=i(l),a=n(4),s=i(a),u=n(5),d=i(u),p=n(6),c=i(p),f=n(9),h=i(f),m=n(12),g=i(m),y=n(14),v=i(y)
document.addEventListener("DOMContentLoaded",function(){var e=o["default"].getSection("SilverStripe\\AssetAdmin\\Controller\\AssetAdmin")
s["default"].add({path:e.url,component:v["default"],indexRoute:{onEnter:function t(n,i){var r=[e.url,"show",0].join("/")
i(r)}},childRoutes:[{path:"show/:folderId/edit/:fileId",component:v["default"]},{path:"show/:folderId",component:v["default"]}]}),d["default"].add("assetAdmin",(0,r.combineReducers)({gallery:c["default"],
editor:g["default"],queuedFiles:h["default"]}))})},function(e,t){e.exports=Redux},function(e,t){e.exports=Config},function(e,t){e.exports=ReactRouteRegister},function(e,t){e.exports=ReducerRegister},function(e,t,n){
"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(){var e=arguments.length<=0||void 0===arguments[0]?p:arguments[0],t=arguments[1],n=null
switch(t.type){case d["default"].ADD_FILES:var i=function(){var n=[]
return t.payload.files.forEach(function(t){var i=!1
e.files.forEach(function(e){e.id===t.id&&(i=!0)}),i||n.push(t)}),{v:(0,s["default"])(o({},e,{count:"undefined"!=typeof t.payload.count?t.payload.count:e.count,files:n.concat(e.files)}))}}()
if("object"===("undefined"==typeof i?"undefined":l(i)))return i.v
case d["default"].LOAD_FILE_SUCCESS:var r=e.files.find(function(e){return e.id===t.payload.id})
if(r){var a=function(){var n=o({},r,t.payload.file)
return{v:(0,s["default"])(o({},e,{files:e.files.map(function(e){return e.id===n.id?n:e})}))}}()
if("object"===("undefined"==typeof a?"undefined":l(a)))return a.v}else if(e.folder.id===t.payload.id)return(0,s["default"])(o({},e,{folder:o({},e.folder,t.payload.file)}))
return e
case d["default"].SELECT_FILES:var u=null
return u=null===t.payload.ids?e.files.map(function(e){return e.id}):e.selectedFiles.concat(t.payload.ids.filter(function(t){return e.selectedFiles.indexOf(t)===-1})),(0,s["default"])(o({},e,{selectedFiles:u
}))
case d["default"].DESELECT_FILES:var c=null
return c=null===t.payload.ids?[]:e.selectedFiles.filter(function(e){return t.payload.ids.indexOf(e)===-1}),(0,s["default"])(o({},e,{selectedFiles:c}))
case d["default"].SORT_FILES:var f=e.files.filter(function(e){return"folder"===e.type}),h=e.files.filter(function(e){return"folder"!==e.type})
return(0,s["default"])(o({},e,{files:f.sort(t.payload.comparator).concat(h.sort(t.payload.comparator))}))
default:return e}}Object.defineProperty(t,"__esModule",{value:!0})
var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}
t["default"]=r
var a=n(7),s=i(a),u=n(8),d=i(u),p={count:0,editorFields:[],file:null,fileId:0,folderId:0,focus:!1,path:null,selectedFiles:[],page:0,errorMessage:null}},function(e,t){e.exports=DeepFreezeStrict},function(e,t){
"use strict"
function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0})
var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}
t["default"]=["ADD_FILES","DESELECT_FILES","SELECT_FILES","SORT_FILES","LOAD_FILE_REQUEST","LOAD_FILE_SUCCESS","HIGHLIGHT_FILES","UPDATE_BATCH_ACTIONS"].reduce(function(e,t){return i(e,n({},t,"GALLERY."+t))

},{})},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(){return(0,s["default"])({attributes:{dimensions:{height:null,width:null}},name:null,canDelete:!1,canEdit:!1,category:null,created:null,extension:null,
filename:null,id:0,lastUpdated:null,messages:null,owner:{id:0,title:null},parent:{filename:null,id:0,title:null},queuedAtTime:null,size:null,title:null,type:null,url:null,xhr:null})}function l(){var e=arguments.length<=0||void 0===arguments[0]?f:arguments[0],t=arguments[1]


switch(t.type){case d["default"].ADD_QUEUED_FILE:return(0,s["default"])(o({},e,{items:e.items.concat([o({},r(),t.payload.file)])}))
case d["default"].FAIL_UPLOAD:return(0,s["default"])(o({},e,{items:e.items.map(function(e){return e.queuedAtTime===t.payload.queuedAtTime?o({},e,{messages:t.payload.messages.error.map(function(e){return{
value:e,type:"error",extraClass:"error"}})}):e})}))
case d["default"].PURGE_UPLOAD_QUEUE:return(0,s["default"])(o({},e,{items:e.items.filter(function(e){return!Array.isArray(e.messages)||!e.messages.filter(function(e){return"error"===e.type||"success"===e.type

}).length>0})}))
case d["default"].REMOVE_QUEUED_FILE:return(0,s["default"])(o({},e,{items:e.items.filter(function(e){return e.queuedAtTime!==t.payload.queuedAtTime})}))
case d["default"].SUCCEED_UPLOAD:return(0,s["default"])(o({},e,{items:e.items.map(function(e){return e.queuedAtTime===t.payload.queuedAtTime?o({},e,{messages:[{value:c["default"]._t("AssetAdmin.DROPZONE_SUCCESS_UPLOAD"),
type:"success",extraClass:"success"}]}):e})}))
case d["default"].UPDATE_QUEUED_FILE:return(0,s["default"])(o({},e,{items:e.items.map(function(e){return e.queuedAtTime===t.payload.queuedAtTime?o({},e,t.payload.updates):e})}))
default:return e}}Object.defineProperty(t,"__esModule",{value:!0})
var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},a=n(7),s=i(a),u=n(10),d=i(u),p=n(11),c=i(p),f={items:[]}
t["default"]=l},function(e,t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={ADD_QUEUED_FILE:"ADD_QUEUED_FILE",FAIL_UPLOAD:"FAIL_UPLOAD",PURGE_UPLOAD_QUEUE:"PURGE_UPLOAD_QUEUE",REMOVE_QUEUED_FILE:"REMOVE_QUEUED_FILE",
SUCCEED_UPLOAD:"SUCCEED_UPLOAD",UPDATE_QUEUED_FILE:"UPDATE_QUEUED_FILE"}},function(e,t){e.exports=i18n},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(){var e=arguments.length<=0||void 0===arguments[0]?d:arguments[0],t=arguments[1]
switch(t.type){case u["default"].UPDATE_ADDTOCAMPAIGN_MODAL:return(0,a["default"])(l({},e,{openAddCampaignModal:t.payload.show}))
default:return e}}Object.defineProperty(t,"__esModule",{value:!0})
var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}
t["default"]=r
var o=n(7),a=i(o),s=n(13),u=i(s),d={openAddCampaignModal:!1}},function(e,t){"use strict"
function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0})
var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}
t["default"]=["UPDATE_ADDTOCAMPAIGN_MODAL"].reduce(function(e,t){return i(e,n({},t,"EDITOR."+t))},{})},function(e,t,n){(function(e){"use strict"
function i(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])
return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")

}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n="SilverStripe\\AssetAdmin\\Controller\\AssetAdmin",i=e.config.sections[n],r=t.params.fileId&&t.files&&t.files.find(function(e){
return e.id===parseInt(t.params.fileId,10)})
return{file:r,breadcrumbs:e.breadcrumbs,sectionConfig:i,limit:i.limit}}function d(e){return{actions:{gallery:(0,b.bindActionCreators)(k,e),editor:(0,b.bindActionCreators)(I,e),breadcrumbsActions:(0,b.bindActionCreators)(L,e)
}}}Object.defineProperty(t,"__esModule",{value:!0})
var p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),f=l(["query ReadFiles($id:ID!) {\n  readFiles(id: $id) {\n    ...allFields\n    ...allFileFields\n    ...on Folder {\n      children {\n        ...allFields\n\t      ...allFileFields\n      },\n      parents {\n        __typename\n        id\n        title\n      }\n    }\n  }\n}\nfragment allFields on FileInterface {\n  __typename\n  id\n  parentId\n  title\n\ttype\n  category\n  exists\n  name\n  filename\n  url\n  canView\n  canEdit\n  canDelete\n}\nfragment allFileFields on File {\n\t__typename\n\textension\n\tsize\n}\n"],["query ReadFiles($id:ID!) {\n  readFiles(id: $id) {\n    ...allFields\n    ...allFileFields\n    ...on Folder {\n      children {\n        ...allFields\n\t      ...allFileFields\n      },\n      parents {\n        __typename\n        id\n        title\n      }\n    }\n  }\n}\nfragment allFields on FileInterface {\n  __typename\n  id\n  parentId\n  title\n\ttype\n  category\n  exists\n  name\n  filename\n  url\n  canView\n  canEdit\n  canDelete\n}\nfragment allFileFields on File {\n\t__typename\n\textension\n\tsize\n}\n"]),h=l(["mutation UpdateFile($id:ID!, $file:FileInput!) {\n  updateFile(id: $id, file: $file) {\n    id\n  }\n}"],["mutation UpdateFile($id:ID!, $file:FileInput!) {\n  updateFile(id: $id, file: $file) {\n    id\n  }\n}"]),m=l(["mutation DeleteFile($id:ID!) {\n  deleteFile(id: $id)\n}"],["mutation DeleteFile($id:ID!) {\n  deleteFile(id: $id)\n}"]),g=n(16),y=r(g),v=n(17),b=n(2),E=n(18),_=n(19),F=r(_),A=n(20),T=r(A),D=n(3),C=r(D),w=n(11),O=r(w),P=n(21),k=i(P),S=n(22),I=i(S),U=n(23),L=i(U),R=n(24),N=r(R),M=n(28),x=r(M),z=n(41),q=r(z),j=n(42),B=r(j),H=n(38),Q=n(40),W=r(Q),G=function(t){
function n(){o(this,n)
var e=a(this,(n.__proto__||Object.getPrototypeOf(n)).call(this))
e.handleOpenFile=e.handleOpenFile.bind(e),e.handleCloseFile=e.handleCloseFile.bind(e),e.handleDelete=e.handleDelete.bind(e),e.handleSubmitEditor=e.handleSubmitEditor.bind(e),e.handleOpenFolder=e.handleOpenFolder.bind(e),
e.createEndpoint=e.createEndpoint.bind(e),e.handleBackButtonClick=e.handleBackButtonClick.bind(e),e.handleFolderIcon=e.handleFolderIcon.bind(e),e.compare=e.compare.bind(e)
var t=C["default"].getSection("SilverStripe\\AssetAdmin\\Controller\\AssetAdmin")
return e.endpoints={updateFolderApi:e.createEndpoint(t.updateFolderEndpoint)},e}return s(n,t),c(n,[{key:"createEndpoint",value:function i(e){var t=arguments.length<=1||void 0===arguments[1]||arguments[1]


return T["default"].createEndpointFetcher(p({},e,t?{defaultData:{SecurityID:C["default"].get("SecurityID")}}:{}))}},{key:"componentWillReceiveProps",value:function r(e){var t=this.compare(this.props.folder,e.folder)


t&&this.setBreadcrumbs(e.folder)}},{key:"handleBackButtonClick",value:function l(e){e.preventDefault(),this.props.folder?this.handleOpenFolder(this.props.folder.parentId||0):this.handleOpenFolder(0)}},{
key:"setBreadcrumbs",value:function u(e){var t=this.props.sectionConfig.url,n=[{text:O["default"]._t("AssetAdmin.FILES","Files"),href:"/"+t+"/"}]
e&&e.id&&(e.parents&&e.parents.forEach(function(e){n.push({text:e.title,href:"/"+t+"/show/"+e.id})}),n.push({text:e.title,href:"/"+t+"/show/"+e.id,icon:{className:"icon font-icon-edit-list",action:this.handleFolderIcon
}})),this.props.actions.breadcrumbsActions.setBreadcrumbs(n)}},{key:"compare",value:function d(e,t){return!!(e&&!t||t&&!e)||e&&t&&(e.id!==t.id||e.name!==t.name)}},{key:"handleFolderIcon",value:function f(e){
this.handleOpenFile(this.props.folder.id),e.preventDefault()}},{key:"handleOpenFile",value:function h(e){var t=this.props.sectionConfig.url
this.props.router.push("/"+t+"/show/"+this.props.folder.id+"/edit/"+e)}},{key:"handleSubmitEditor",value:function m(e,t,n){var i=this
e.preventDefault(),n().then(function(e){return i.props.actions.gallery.loadFile(i.props.file.id,e.record),e})}},{key:"handleCloseFile",value:function g(){this.handleOpenFolder(this.props.folder.id)}},{
key:"handleOpenFolder",value:function v(e){var t=this.props.sectionConfig.url
this.props.router.push("/"+t+"/show/"+e)}},{key:"handleDelete",value:function b(e){var t=this,n=this.props.files.find(function(t){return t.id===e})
if(!n&&this.props.folder&&this.props.folder.id===e&&(n=this.props.folder),!n)throw new Error("File selected for deletion cannot be found")
var i=n.parent?n.parent.id:0,r=this.props.client.dataId({__typename:n.__typename,id:n.id})
this.props.mutate({mutation:"DeleteFile",variables:{id:n.id},resultBehaviors:[{type:"DELETE",dataId:r}]}).then(function(){t.props.actions.gallery.deselectFiles([n.id])
var e=t.props.sectionConfig.url,r=!(!t.props.file||n.id!==t.props.file.id),l=!(!t.props.folder||n.id!==t.props.folder.id);(r||l)&&t.props.router.push("/"+e+"/show/"+i)})}},{key:"render",value:function E(){
var t=this.props.sectionConfig,n=t.createFileEndpoint.url,i=t.createFileEndpoint.method,r=e(".cms-content.AssetAdmin")
this.props.loading?r.addClass("loading"):r.removeClass("loading")
var l=this.props.file&&y["default"].createElement(N["default"],{file:this.props.file,onClose:this.handleCloseFile,editFileSchemaUrl:t.form.FileEditForm.schemaUrl,actions:this.props.actions.editor,onSubmit:this.handleSubmitEditor,
onDelete:this.handleDelete,addToCampaignSchemaUrl:t.form.AddToCampaignForm.schemaUrl}),o=this.props.folder&&y["default"].createElement(x["default"],{files:this.props.files,fileId:this.props.params.fileId,
folder:this.props.folder,name:this.props.name,limit:this.props.limit,page:this.props.page,bulkActions:this.props.bulkActions,createFileApiUrl:n,createFileApiMethod:i,updateFolderApi:this.endpoints.updateFolderApi,
onDelete:this.handleDelete,onOpenFile:this.handleOpenFile,onOpenFolder:this.handleOpenFolder,sectionConfig:this.props.sectionConfig}),a=!(!this.props.folder||!this.props.folder.id)
return y["default"].createElement("div",{className:"fill-height cms-gallery no-preview collapse in"},y["default"].createElement(B["default"],{showBackButton:a,handleBackButtonClick:this.handleBackButtonClick
},y["default"].createElement(q["default"],{multiline:!0,crumbs:this.props.breadcrumbs})),y["default"].createElement("div",{className:"flexbox-area-grow fill-width gallery"},l,o))}}]),n}(F["default"])
G.propTypes={mutate:y["default"].PropTypes.func.isRequired,config:y["default"].PropTypes.shape({forms:y["default"].PropTypes.shape({editForm:y["default"].PropTypes.shape({schemaUrl:y["default"].PropTypes.string
})})}),sectionConfig:y["default"].PropTypes.shape({url:y["default"].PropTypes.string}),file:y["default"].PropTypes.object,files:y["default"].PropTypes.array,folder:y["default"].PropTypes.shape({id:y["default"].PropTypes.number,
title:y["default"].PropTypes.string,parents:y["default"].PropTypes.array,parentID:y["default"].PropTypes.number,canView:y["default"].PropTypes.bool,canEdit:y["default"].PropTypes.bool})}
var K=(0,W["default"])(f),$=(0,W["default"])(h),V=(0,W["default"])(m)
t["default"]=(0,b.compose)((0,H.graphql)(K,{options:function Z(e){return{variables:{id:e.params.folderId}}},props:function Y(e){var t=e.data,n=t.loading,i=t.readFiles
return{loading:n,folder:i&&i[0]?i[0]:null,files:i&&i[0]?i[0].children:[]}}}),(0,H.graphql)($),(0,H.graphql)(V),function(e){return(0,H.withApollo)(e)},function(e){return(0,E.withRouter)(e)},(0,v.connect)(u,d))(G)

}).call(t,n(15))},function(e,t){e.exports=jQuery},function(e,t){e.exports=React},function(e,t){e.exports=ReactRedux},function(e,t){e.exports=ReactRouter},function(e,t){e.exports=SilverStripeComponent},function(e,t){
e.exports=Backend},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){return function(n){return n({type:d["default"].ADD_FILES,payload:{files:e,count:t}})}}function l(e,t){return function(n){n({type:d["default"].LOAD_FILE_SUCCESS,
payload:{id:e,file:t}})}}function o(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0]
return function(t){return t({type:d["default"].SELECT_FILES,payload:{ids:e}})}}function a(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0]
return function(t){return t({type:d["default"].DESELECT_FILES,payload:{ids:e}})}}function s(e){return function(t){return t({type:d["default"].SORT_FILES,payload:{comparator:e}})}}Object.defineProperty(t,"__esModule",{
value:!0}),t.addFiles=r,t.loadFile=l,t.selectFiles=o,t.deselectFiles=a,t.sortFiles=s
var u=n(8),d=i(u)},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(e){return function(t){return t({type:o["default"].UPDATE_ADDTOCAMPAIGN_MODAL,payload:{show:e}})}}Object.defineProperty(t,"__esModule",{value:!0
}),t.updateAddToCampaignModal=r
var l=n(13),o=i(l)},function(e,t){e.exports=BreadcrumbsActions},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{
value:!0})
var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(11),u=i(s),d=n(16),p=i(d),c=n(25),f=i(c),h=n(26),m=i(h),g=n(27),y=i(g),v=function(e){
function t(e){r(this,t)
var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.handleCancelKeyDown=n.handleCancelKeyDown.bind(n),n.handleClose=n.handleClose.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n.handleAction=n.handleAction.bind(n),n.handleSubmitModal=n.handleSubmitModal.bind(n),
n.closeModal=n.closeModal.bind(n),n.openModal=n.openModal.bind(n),n.state={openModal:!1},n}return o(t,e),a(t,[{key:"getCancelButton",value:function n(){return p["default"].createElement("a",{tabIndex:"0",
className:"btn btn--top-right btn--no-text font-icon-cancel btn--icon-xl",onClick:this.handleClose,onKeyDown:this.handleCancelKeyDown,type:"button","aria-label":u["default"]._t("AssetAdmin.CANCEL")})}},{
key:"handleAction",value:function i(e,t,n){return"action_addtocampaign"===t?(this.openModal(),void e.preventDefault()):"action_delete"===t?(confirm(u["default"]._t("AssetAdmin.CONFIRMDELETE"))&&this.props.onDelete(n.ID),
void e.preventDefault()):void 0}},{key:"handleCancelKeyDown",value:function s(e){e.keyCode!==m["default"].SPACE_KEY_CODE&&e.keyCode!==m["default"].RETURN_KEY_CODE||this.handleClose(e)}},{key:"handleSubmit",
value:function d(e,t,n){return"function"==typeof this.props.onSubmit?this.props.onSubmit(e,t,n):(e.preventDefault(),n())}},{key:"handleSubmitModal",value:function c(e,t,n){return e.preventDefault(),t.Campaign?n():(alert(u["default"]._t("AddToCampaigns.ErrorCampaignNotSelected","There was no campaign selected to be added to")),
null)}},{key:"openModal",value:function h(){this.setState({openModal:!0})}},{key:"closeModal",value:function g(){this.setState({openModal:!1})}},{key:"handleClose",value:function v(e){this.props.onClose(),
this.closeModal(),e&&e.preventDefault()}},{key:"render",value:function b(){var e=this.props.editFileSchemaUrl+"/"+this.props.file.id,t=this.props.addToCampaignSchemaUrl+"/"+this.props.file.id
return p["default"].createElement("div",{className:"panel panel--padded panel--scrollable form--no-dividers editor"},this.getCancelButton(),p["default"].createElement("div",{className:"editor__details"
},p["default"].createElement(f["default"],{schemaUrl:e,handleSubmit:this.handleSubmit,handleAction:this.handleAction}),p["default"].createElement(y["default"],{show:this.state.openModal,handleHide:this.closeModal,
handleSubmit:this.handleSubmitModal,schemaUrl:t,bodyClassName:"modal__dialog",responseClassBad:"modal__response modal__response--error",responseClassGood:"modal__response modal__response--good"})))}}]),
t}(d.Component)
v.propTypes={file:p["default"].PropTypes.shape({id:p["default"].PropTypes.object.isRequired}).isRequired,actions:p["default"].PropTypes.object,onClose:p["default"].PropTypes.func.isRequired,onSubmit:p["default"].PropTypes.func.isRequired,
onDelete:p["default"].PropTypes.func.isRequired,editFileSchemaUrl:p["default"].PropTypes.string.isRequired,addToCampaignSchemaUrl:p["default"].PropTypes.string,openAddCampaignModal:p["default"].PropTypes.bool
},t["default"]=v},function(e,t){e.exports=FormBuilder},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0})
var r=n(11),l=i(r)
t["default"]={CSS_TRANSITION_TIME:300,THUMBNAIL_HEIGHT:150,THUMBNAIL_WIDTH:200,BULK_ACTIONS:[{value:"delete",label:l["default"]._t("AssetAdmin.BULK_ACTIONS_DELETE","Delete"),className:"font-icon-trash",
destructive:!0,callback:null,confirm:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=null,t=l["default"].sprintf(l["default"]._t("AssetAdmin.BULK_ACTIONS_CONFIRM"),l["default"]._t("AssetAdmin.BULK_ACTIONS_DELETE_CONFIRM","delete"))


return e=confirm(t)?Promise.resolve():Promise.reject()})},{value:"edit",label:l["default"]._t("AssetAdmin.BULK_ACTIONS_EDIT","Edit"),className:"font-icon-edit",destructive:!1,canApply:function o(e){return 1===e.length

},callback:null}],BULK_ACTIONS_PLACEHOLDER:l["default"]._t("AssetAdmin.BULK_ACTIONS_PLACEHOLDER"),SPACE_KEY_CODE:32,RETURN_KEY_CODE:13}},function(e,t){e.exports=FormBuilderModal},function(e,t,n){"use strict"


function i(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])
return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")

}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){return function(n,i){
var r=n[e].toLowerCase(),l=i[e].toLowerCase()
if("asc"===t){if(r<l)return-1
if(r>l)return 1}else{if(r>l)return-1
if(r<l)return 1}return 0}}function d(e){var t=e.assetAdmin.gallery,n=t.count,i=t.selectedFiles,r=t.page,l=t.errorMessage
return{count:n,selectedFiles:i,page:r,queuedFiles:e.assetAdmin.queuedFiles}}function p(e){return{actions:{gallery:(0,w.bindActionCreators)(j,e),queuedFiles:(0,w.bindActionCreators)(H,e)}}}Object.defineProperty(t,"__esModule",{
value:!0}),t.Gallery=void 0
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),h=l(["mutation CreateFolder($folder:FolderInput!) {\n  createFolder(folder: $folder) {\n    __typename\n    id\n    name\n    title\n    parentId\n  }\n}"],["mutation CreateFolder($folder:FolderInput!) {\n  createFolder(folder: $folder) {\n    __typename\n    id\n    name\n    title\n    parentId\n  }\n}"]),m=n(15),g=r(m),y=n(11),v=r(y),b=n(16),E=r(b),_=n(29),F=r(_),A=n(30),T=r(A),D=n(17),C=n(18),w=n(2),O=n(31),P=r(O),k=n(3),S=r(k),I=n(32),U=r(I),L=n(35),R=r(L),N=n(36),M=r(N),x=n(26),z=r(x),q=n(21),j=i(q),B=n(37),H=i(B),Q=n(38),W=n(39),G=r(W),K=n(40),$=r(K),V=t.Gallery=function(e){
function t(e){o(this,t)
var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.sort="name",n.direction="asc",n.sorters=[{field:"title",direction:"asc",label:v["default"]._t("AssetAdmin.FILTER_TITLE_ASC")},{field:"title",direction:"desc",label:v["default"]._t("AssetAdmin.FILTER_TITLE_DESC")
},{field:"created",direction:"desc",label:v["default"]._t("AssetAdmin.FILTER_DATE_DESC")},{field:"created",direction:"asc",label:v["default"]._t("AssetAdmin.FILTER_DATE_ASC")}],n.handleFolderActivate=n.handleFolderActivate.bind(n),
n.handleFileActivate=n.handleFileActivate.bind(n),n.handleToggleSelect=n.handleToggleSelect.bind(n),n.handleAddedFile=n.handleAddedFile.bind(n),n.handleCancelUpload=n.handleCancelUpload.bind(n),n.handleRemoveErroredUpload=n.handleRemoveErroredUpload.bind(n),
n.handleUploadProgress=n.handleUploadProgress.bind(n),n.handleSending=n.handleSending.bind(n),n.handleItemDelete=n.handleItemDelete.bind(n),n.handleBackClick=n.handleBackClick.bind(n),n.handleMoreClick=n.handleMoreClick.bind(n),
n.handleSort=n.handleSort.bind(n),n.handleSuccessfulUpload=n.handleSuccessfulUpload.bind(n),n.handleFailedUpload=n.handleFailedUpload.bind(n),n.handleCreateFolder=n.handleCreateFolder.bind(n),n}return s(t,e),
f(t,[{key:"componentWillUpdate",value:function n(){var e=(0,g["default"])(F["default"].findDOMNode(this)).find(".gallery__sort .dropdown")
e.off("change")}},{key:"componentDidUpdate",value:function i(e){var t=(0,g["default"])(F["default"].findDOMNode(this)).find(".gallery__sort .dropdown")
t.chosen({allow_single_deselect:!0,disable_search_threshold:20}),t.on("change",function(){return P["default"].Simulate.click(t.find(":selected")[0])})}},{key:"getNoItemsNotice",value:function r(){return this.props.files.length<1&&this.props.queuedFiles.items.length<1&&!this.props.loading?E["default"].createElement("p",{
className:"gallery__no-item-notice"},v["default"]._t("AssetAdmin.NOITEMSFOUND")):null}},{key:"getBackButton",value:function l(){var e=["btn","btn-secondary","btn--no-text","font-icon-level-up","btn--icon-large","gallery__back"].join(" ")


return null!==this.props.folder.parentID?E["default"].createElement("button",{className:e,onClick:this.handleBackClick,ref:"backButton"}):null}},{key:"getBulkActionsComponent",value:function d(){var e=this,t=function l(t){
t.forEach(function(t){return e.props.onDelete(t.id)})},n=function o(t){e.props.onOpenFile(t[0].id)},i=z["default"].BULK_ACTIONS.map(function(e){return"delete"!==e.value||e.callback?"edit"!==e.value||e.callback?e:c({},e,{
callback:n}):c({},e,{callback:t})}),r=this.props.selectedFiles.map(function(t){return e.props.files.find(function(e){return t===e.id})})
return r.length>0&&this.props.bulkActions?E["default"].createElement(M["default"],{actions:i,items:r,key:r.length>0}):null}},{key:"getMoreButton",value:function p(){return this.props.count>this.props.files.length?E["default"].createElement("button",{
className:"gallery__load-more",onClick:this.handleMoreClick},v["default"]._t("AssetAdmin.LOADMORE")):null}},{key:"handleSort",value:function h(e){var t=e.target.dataset
this.props.actions.queuedFiles.purgeUploadQueue(),this.props.actions.gallery.sortFiles(u(t.field,t.direction))}},{key:"handleCancelUpload",value:function m(e){e.xhr.abort(),this.props.actions.queuedFiles.removeQueuedFile(e.queuedAtTime)

}},{key:"handleRemoveErroredUpload",value:function y(e){this.props.actions.queuedFiles.removeQueuedFile(e.queuedAtTime)}},{key:"handleAddedFile",value:function b(e){this.props.actions.queuedFiles.addQueuedFile(e)

}},{key:"handleSending",value:function _(e,t){this.props.actions.queuedFiles.updateQueuedFile(e._queuedAtTime,{xhr:t})}},{key:"handleUploadProgress",value:function A(e,t){this.props.actions.queuedFiles.updateQueuedFile(e._queuedAtTime,{
progress:t})}},{key:"handleCreateFolder",value:function D(e){var t=this.promptFolderName(),n=parseInt(this.props.folder.id,10)
if(t){var i=this.props.client.dataId({__typename:"Folder",id:n})
this.props.mutate({mutation:"CreateFolder",variables:{folder:{parentId:n,name:t}},resultBehaviors:[{type:"ARRAY_INSERT",resultPath:["createFolder"],storePath:[i,"children"],where:"PREPEND"}]})}e.preventDefault()

}},{key:"handleSuccessfulUpload",value:function C(e){var t=JSON.parse(e.xhr.response)
return"undefined"!=typeof t[0].error?void this.handleFailedUpload(e):(this.props.actions.queuedFiles.removeQueuedFile(e._queuedAtTime),void this.props.actions.gallery.addFiles(t,this.props.count+1))}},{
key:"handleFailedUpload",value:function w(e,t){this.props.actions.queuedFiles.failUpload(e._queuedAtTime,t)}},{key:"handleItemDelete",value:function O(e,t){this.props.onDelete([t.id])}},{key:"promptFolderName",
value:function k(){return prompt(v["default"]._t("AssetAdmin.PROMPTFOLDERNAME"))}},{key:"itemIsSelected",value:function I(e){return this.props.selectedFiles.indexOf(e)>-1}},{key:"itemIsHighlighted",value:function L(e){
return this.props.fileId===e}},{key:"handleFolderActivate",value:function N(e,t){e.preventDefault(),this.props.onOpenFolder(t.id,t)}},{key:"handleFileActivate",value:function x(e,t){e.preventDefault(),
null!==t.created&&this.props.onOpenFile(t.id,t)}},{key:"handleToggleSelect",value:function q(e,t){this.props.selectedFiles.indexOf(t.id)===-1?this.props.actions.gallery.selectFiles([t.id]):this.props.actions.gallery.deselectFiles([t.id])

}},{key:"handleMoreClick",value:function j(e){e.stopPropagation(),e.preventDefault(),this.props.actions.gallery.deselectFiles()}},{key:"handleBackClick",value:function B(e){e.preventDefault()
var t=this.props.sectionConfig.url
this.props.router.push("/"+t+"/show/"+this.props.folder.parentID)}},{key:"render",value:function H(){var e=this
if(!this.props.folder)return this.props.errorMessage?E["default"].createElement("div",{className:"gallery__error"},E["default"].createElement("div",{className:"gallery__error-message"},E["default"].createElement("h3",null,this.props.errorMessage&&v["default"]._t("AssetAdmin.DROPZONE_RESPONSE_ERROR","Server responded with an error.")),E["default"].createElement("p",null,this.props.errorMessage))):E["default"].createElement("div",null)


var t={height:z["default"].THUMBNAIL_HEIGHT,width:z["default"].THUMBNAIL_WIDTH},n={url:this.props.createFileApiUrl,method:this.props.createFileApiMethod,paramName:"Upload",clickable:"#upload-button"},i=S["default"].get("SecurityID"),r=this.props.folder.canEdit


return E["default"].createElement("div",{className:"flexbox-area-grow gallery__outer"},E["default"].createElement(T["default"],{transitionName:"bulk-actions",transitionEnterTimeout:z["default"].CSS_TRANSITION_TIME,
transitionLeaveTimeout:z["default"].CSS_TRANSITION_TIME},this.getBulkActionsComponent()),E["default"].createElement("div",{className:"panel panel--padded panel--scrollable gallery__main"},E["default"].createElement("div",{
className:"gallery__sort fieldholder-small"},E["default"].createElement("select",{className:"dropdown no-change-track no-chzn",tabIndex:"0",style:{width:"160px"}},this.sorters.map(function(t,n){return E["default"].createElement("option",{
key:n,onClick:e.handleSort,"data-field":t.field,"data-direction":t.direction},t.label)}))),E["default"].createElement("div",{className:"toolbar--content toolbar--space-save"},this.getBackButton(),E["default"].createElement("button",{
id:"upload-button",className:"btn btn-secondary font-icon-upload btn--icon-xl",type:"button",disabled:!r},E["default"].createElement("span",{className:"btn__text"},v["default"]._t("AssetAdmin.DROPZONE_UPLOAD"))),E["default"].createElement("button",{
id:"add-folder-button",className:"btn btn-secondary font-icon-folder-add btn--icon-xl ",type:"button",onClick:this.handleCreateFolder,disabled:!r},E["default"].createElement("span",{className:"btn__text"
},v["default"]._t("AssetAdmin.ADD_FOLDER_BUTTON")))),E["default"].createElement(U["default"],{canUpload:r,handleAddedFile:this.handleAddedFile,handleError:this.handleFailedUpload,handleSuccess:this.handleSuccessfulUpload,
handleSending:this.handleSending,handleUploadProgress:this.handleUploadProgress,preview:t,folderId:this.props.folder.id,options:n,securityID:i,uploadButton:!1},E["default"].createElement("div",{className:"gallery__folders"
},this.props.files.map(function(t,n){var i=null
return"folder"===t.type&&(i=E["default"].createElement(R["default"],{key:n,item:t,selected:e.itemIsSelected(t.id),highlighted:e.itemIsHighlighted(t.id),handleDelete:e.handleItemDelete,handleToggleSelect:e.handleToggleSelect,
handleActivate:e.handleFolderActivate})),i})),E["default"].createElement("div",{className:"gallery__files"},this.props.queuedFiles.items.map(function(t,n){return E["default"].createElement(R["default"],{
key:"queued_file_"+n,item:t,selected:e.itemIsSelected(t.id),highlighted:e.itemIsHighlighted(t.id),handleDelete:e.handleItemDelete,handleToggleSelect:e.handleToggleSelect,handleActivate:e.handleFileActivate,
handleCancelUpload:e.handleCancelUpload,handleRemoveErroredUpload:e.handleRemoveErroredUpload,messages:t.messages,uploading:!0})}),this.props.files.map(function(t,n){var i=null
return"folder"!==t.type&&(i=E["default"].createElement(R["default"],{key:"file_"+n,item:t,selected:e.itemIsSelected(t.id),highlighted:e.itemIsHighlighted(t.id),handleDelete:e.handleItemDelete,handleToggleSelect:e.handleToggleSelect,
handleActivate:e.handleFileActivate})),i})),this.getNoItemsNotice(),E["default"].createElement("div",{className:"gallery__load"},this.getMoreButton()))))}}]),t}(b.Component)
V.defaultProps={bulkActions:!0,files:[]},V.propTypes={client:E["default"].PropTypes.instanceOf(G["default"]).isRequired,mutate:E["default"].PropTypes.func.isRequired,loading:E["default"].PropTypes.bool,
count:E["default"].PropTypes.number,fileId:E["default"].PropTypes.number,folder:E["default"].PropTypes.shape({id:E["default"].PropTypes.number,parentID:E["default"].PropTypes.number,canView:E["default"].PropTypes.bool,
canEdit:E["default"].PropTypes.bool}),files:E["default"].PropTypes.array,selectedFiles:E["default"].PropTypes.arrayOf(E["default"].PropTypes.number),bulkActions:E["default"].PropTypes.bool,limit:E["default"].PropTypes.number,
page:E["default"].PropTypes.number,queuedFiles:E["default"].PropTypes.shape({items:E["default"].PropTypes.array.isRequired}),onOpenFile:E["default"].PropTypes.func.isRequired,onOpenFolder:E["default"].PropTypes.func.isRequired,
createFileApiUrl:E["default"].PropTypes.string,createFileApiMethod:E["default"].PropTypes.string,onDelete:E["default"].PropTypes.func,actions:E["default"].PropTypes.object,sectionConfig:E["default"].PropTypes.shape({
url:E["default"].PropTypes.string}),router:E["default"].PropTypes.object}
var Z=(0,$["default"])(h)
t.Gallery=V,t["default"]=(0,w.compose)((0,Q.graphql)(Z),function(e){return(0,Q.withApollo)(e)},function(e){return(0,C.withRouter)(e)},(0,D.connect)(d,p))(V)},function(e,t){e.exports=ReactDom},function(e,t){
e.exports=ReactAddonsCssTransitionGroup},function(e,t){e.exports=ReactAddonsTestUtils},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{
value:!0})
var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=function A(e,t,n){null===e&&(e=Function.prototype)


var i=Object.getOwnPropertyDescriptor(e,t)
if(void 0===i){var r=Object.getPrototypeOf(e)
return null===r?void 0:A(r,t,n)}if("value"in i)return i.value
var l=i.get
if(void 0!==l)return l.call(n)},d=n(16),p=i(d),c=n(29),f=i(c),h=n(19),m=i(h),g=n(11),y=i(g),v=n(33),b=i(v),E=n(15),_=i(E),F=function(e){function t(e){r(this,t)
var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.dropzone=null,n.dragging=!1,n.handleAddedFile=n.handleAddedFile.bind(n),n.handleDragEnter=n.handleDragEnter.bind(n),n.handleDragLeave=n.handleDragLeave.bind(n),n.handleDrop=n.handleDrop.bind(n),
n.handleUploadProgress=n.handleUploadProgress.bind(n),n.handleError=n.handleError.bind(n),n.handleSending=n.handleSending.bind(n),n.handleSuccess=n.handleSuccess.bind(n),n.loadImage=n.loadImage.bind(n),
n}return o(t,e),s(t,[{key:"componentDidMount",value:function n(){u(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentDidMount",this).call(this)
var e=this.getDefaultOptions()
this.props.uploadButton===!0&&(e.clickable=(0,_["default"])(f["default"].findDOMNode(this)).find(".asset-dropzone__upload-button")[0]),this.dropzone=new b["default"](f["default"].findDOMNode(this),a({},e,this.props.options)),
"undefined"!=typeof this.props.promptOnRemove&&this.setPromptOnRemove(this.props.promptOnRemove)}},{key:"componentWillUnmount",value:function i(){u(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentWillUnmount",this).call(this),
this.dropzone.disable()}},{key:"render",value:function d(){var e=["asset-dropzone"],t={className:"asset-dropzone__upload-button ss-ui-button font-icon-upload",type:"button"}
return this.props.canUpload||(t.disabled=!0),this.dragging===!0&&e.push("dragging"),p["default"].createElement("div",{className:e.join(" ")},this.props.uploadButton&&p["default"].createElement("button",t,y["default"]._t("AssetAdmin.DROPZONE_UPLOAD")),this.props.children)

}},{key:"getDefaultOptions",value:function c(){return{autoProcessQueue:!1,addedfile:this.handleAddedFile,dragenter:this.handleDragEnter,dragleave:this.handleDragLeave,drop:this.handleDrop,uploadprogress:this.handleUploadProgress,
dictDefaultMessage:y["default"]._t("AssetAdmin.DROPZONE_DEFAULT_MESSAGE"),dictFallbackMessage:y["default"]._t("AssetAdmin.DROPZONE_FALLBACK_MESSAGE"),dictFallbackText:y["default"]._t("AssetAdmin.DROPZONE_FALLBACK_TEXT"),
dictInvalidFileType:y["default"]._t("AssetAdmin.DROPZONE_INVALID_FILE_TYPE"),dictResponseError:y["default"]._t("AssetAdmin.DROPZONE_RESPONSE_ERROR"),dictCancelUpload:y["default"]._t("AssetAdmin.DROPZONE_CANCEL_UPLOAD"),
dictCancelUploadConfirmation:y["default"]._t("AssetAdmin.DROPZONE_CANCEL_UPLOAD_CONFIRMATION"),dictRemoveFile:y["default"]._t("AssetAdmin.DROPZONE_REMOVE_FILE"),dictMaxFilesExceeded:y["default"]._t("AssetAdmin.DROPZONE_MAX_FILES_EXCEEDED"),
error:this.handleError,sending:this.handleSending,success:this.handleSuccess,thumbnailHeight:150,thumbnailWidth:200}}},{key:"getFileCategory",value:function h(e){return e.split("/")[0]}},{key:"handleDragEnter",
value:function m(e){this.props.canUpload&&(this.dragging=!0,this.forceUpdate(),"function"==typeof this.props.handleDragEnter&&this.props.handleDragEnter(e))}},{key:"handleDragLeave",value:function g(e){
var t=f["default"].findDOMNode(this)
this.props.canUpload&&e.target===t&&(this.dragging=!1,this.forceUpdate(),"function"==typeof this.props.handleDragLeave&&this.props.handleDragLeave(e,t))}},{key:"handleUploadProgress",value:function v(e,t,n){
"function"==typeof this.props.handleUploadProgress&&this.props.handleUploadProgress(e,t,n)}},{key:"handleDrop",value:function E(e){this.dragging=!1,this.forceUpdate(),"function"==typeof this.props.handleDrop&&this.props.handleDrop(e)

}},{key:"handleSending",value:function F(e,t,n){n.append("SecurityID",this.props.securityID),n.append("ParentID",this.props.folderId),"function"==typeof this.props.handleSending&&this.props.handleSending(e,t,n)

}},{key:"handleAddedFile",value:function A(e){var t=this
if(!this.props.canUpload)return Promise.reject(new Error(y["default"]._t("AssetAdmin.DROPZONE_CANNOT_UPLOAD")))
e._queuedAtTime=Date.now()
var n=new Promise(function(n){var i=new FileReader
i.onload=function(i){if("image"===t.getFileCategory(e.type)){var r=document.createElement("img")
n(t.loadImage(r,i.target.result))}else n({})},i.readAsDataURL(e)})
return n.then(function(n){var i={dimensions:{height:n.height,width:n.width},category:t.getFileCategory(e.type),filename:e.name,queuedAtTime:e._queuedAtTime,size:e.size,title:e.name,type:e.type,url:n.thumbnailURL
}
return t.props.handleAddedFile(i),t.dropzone.processFile(e),i})}},{key:"loadImage",value:function T(e,t){var n=this
return new Promise(function(i){e.onload=function(){var t=document.createElement("canvas"),r=t.getContext("2d"),l=2*n.props.preview.width,o=2*n.props.preview.height,a=e.naturalWidth/e.naturalHeight
e.naturalWidth<l||e.naturalHeight<o?(t.width=e.naturalWidth,t.height=e.naturalHeight):a<1?(t.width=l,t.height=l/a):(t.width=o*a,t.height=o),r.drawImage(e,0,0,t.width,t.height)
var s=t.toDataURL("image/png")
i({width:e.naturalWidth,height:e.naturalHeight,thumbnailURL:s})},e.src=t})}},{key:"handleError",value:function D(e,t){"function"==typeof this.props.handleError&&this.props.handleError(e,t)}},{key:"handleSuccess",
value:function C(e){this.props.handleSuccess(e)}},{key:"setPromptOnRemove",value:function w(e){this.dropzone.options.dictRemoveFileConfirmation=e}}]),t}(m["default"])
F.propTypes={folderId:p["default"].PropTypes.number.isRequired,handleAddedFile:p["default"].PropTypes.func.isRequired,handleDragEnter:p["default"].PropTypes.func,handleDragLeave:p["default"].PropTypes.func,
handleDrop:p["default"].PropTypes.func,handleError:p["default"].PropTypes.func.isRequired,handleSending:p["default"].PropTypes.func,handleSuccess:p["default"].PropTypes.func.isRequired,options:p["default"].PropTypes.shape({
url:p["default"].PropTypes.string.isRequired}),promptOnRemove:p["default"].PropTypes.string,securityID:p["default"].PropTypes.string.isRequired,uploadButton:p["default"].PropTypes.bool,canUpload:p["default"].PropTypes.bool.isRequired,
preview:p["default"].PropTypes.shape({width:p["default"].PropTypes.number,height:p["default"].PropTypes.number})},F.defaultProps={uploadButton:!0},t["default"]=F},function(e,t,n){(function(e,t){(function(){
var n,i,r,l,o,a,s,u,d=[].slice,p={}.hasOwnProperty,c=function(e,t){function n(){this.constructor=e}for(var i in t)p.call(t,i)&&(e[i]=t[i])
return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e}
s=function(){},i=function(){function e(){}return e.prototype.addEventListener=e.prototype.on,e.prototype.on=function(e,t){return this._callbacks=this._callbacks||{},this._callbacks[e]||(this._callbacks[e]=[]),
this._callbacks[e].push(t),this},e.prototype.emit=function(){var e,t,n,i,r,l
if(i=arguments[0],e=2<=arguments.length?d.call(arguments,1):[],this._callbacks=this._callbacks||{},n=this._callbacks[i])for(r=0,l=n.length;r<l;r++)t=n[r],t.apply(this,e)
return this},e.prototype.removeListener=e.prototype.off,e.prototype.removeAllListeners=e.prototype.off,e.prototype.removeEventListener=e.prototype.off,e.prototype.off=function(e,t){var n,i,r,l,o
if(!this._callbacks||0===arguments.length)return this._callbacks={},this
if(i=this._callbacks[e],!i)return this
if(1===arguments.length)return delete this._callbacks[e],this
for(r=l=0,o=i.length;l<o;r=++l)if(n=i[r],n===t){i.splice(r,1)
break}return this},e}(),n=function(e){function t(e,i){var r,l,o
if(this.element=e,this.version=t.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),this.clickableElements=[],this.listeners=[],this.files=[],"string"==typeof this.element&&(this.element=document.querySelector(this.element)),
!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.")
if(this.element.dropzone)throw new Error("Dropzone already attached.")
if(t.instances.push(this),this.element.dropzone=this,r=null!=(o=t.optionsForElement(this.element))?o:{},this.options=n({},this.defaultOptions,r,null!=i?i:{}),this.options.forceFallback||!t.isBrowserSupported())return this.options.fallback.call(this)


if(null==this.options.url&&(this.options.url=this.element.getAttribute("action")),!this.options.url)throw new Error("No URL provided.")
if(this.options.acceptedFiles&&this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.")
this.options.acceptedMimeTypes&&(this.options.acceptedFiles=this.options.acceptedMimeTypes,delete this.options.acceptedMimeTypes),this.options.method=this.options.method.toUpperCase(),(l=this.getExistingFallback())&&l.parentNode&&l.parentNode.removeChild(l),
this.options.previewsContainer!==!1&&(this.options.previewsContainer?this.previewsContainer=t.getElement(this.options.previewsContainer,"previewsContainer"):this.previewsContainer=this.element),this.options.clickable&&(this.options.clickable===!0?this.clickableElements=[this.element]:this.clickableElements=t.getElements(this.options.clickable,"clickable")),
this.init()}var n,r
return c(t,e),t.prototype.Emitter=i,t.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],
t.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,parallelUploads:2,uploadMultiple:!1,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,
thumbnailHeight:120,filesizeBase:1e3,maxFiles:null,params:{},clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,
hiddenInputContainer:"body",capture:null,renameFilename:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",
dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",
dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",
accept:function(e,t){return t()},init:function(){return s},forceFallback:!1,fallback:function(){var e,n,i,r,l,o
for(this.element.className=""+this.element.className+" dz-browser-not-supported",o=this.element.getElementsByTagName("div"),r=0,l=o.length;r<l;r++)e=o[r],/(^| )dz-message($| )/.test(e.className)&&(n=e,
e.className="dz-message")
return n||(n=t.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(n)),i=n.getElementsByTagName("span")[0],i&&(null!=i.textContent?i.textContent=this.options.dictFallbackMessage:null!=i.innerText&&(i.innerText=this.options.dictFallbackMessage)),
this.element.appendChild(this.getFallbackForm())},resize:function(e){var t,n,i
return t={srcX:0,srcY:0,srcWidth:e.width,srcHeight:e.height},n=e.width/e.height,t.optWidth=this.options.thumbnailWidth,t.optHeight=this.options.thumbnailHeight,null==t.optWidth&&null==t.optHeight?(t.optWidth=t.srcWidth,
t.optHeight=t.srcHeight):null==t.optWidth?t.optWidth=n*t.optHeight:null==t.optHeight&&(t.optHeight=1/n*t.optWidth),i=t.optWidth/t.optHeight,e.height<t.optHeight||e.width<t.optWidth?(t.trgHeight=t.srcHeight,
t.trgWidth=t.srcWidth):n>i?(t.srcHeight=e.height,t.srcWidth=t.srcHeight*i):(t.srcWidth=e.width,t.srcHeight=t.srcWidth/i),t.srcX=(e.width-t.srcWidth)/2,t.srcY=(e.height-t.srcHeight)/2,t},drop:function(e){
return this.element.classList.remove("dz-drag-hover")},dragstart:s,dragend:function(e){return this.element.classList.remove("dz-drag-hover")},dragenter:function(e){return this.element.classList.add("dz-drag-hover")

},dragover:function(e){return this.element.classList.add("dz-drag-hover")},dragleave:function(e){return this.element.classList.remove("dz-drag-hover")},paste:s,reset:function(){return this.element.classList.remove("dz-started")

},addedfile:function(e){var n,i,r,l,o,a,s,u,d,p,c,f,h
if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){for(e.previewElement=t.createElement(this.options.previewTemplate.trim()),e.previewTemplate=e.previewElement,
this.previewsContainer.appendChild(e.previewElement),p=e.previewElement.querySelectorAll("[data-dz-name]"),l=0,s=p.length;l<s;l++)n=p[l],n.textContent=this._renameFilename(e.name)
for(c=e.previewElement.querySelectorAll("[data-dz-size]"),o=0,u=c.length;o<u;o++)n=c[o],n.innerHTML=this.filesize(e.size)
for(this.options.addRemoveLinks&&(e._removeLink=t.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),e.previewElement.appendChild(e._removeLink)),
i=function(n){return function(i){return i.preventDefault(),i.stopPropagation(),e.status===t.UPLOADING?t.confirm(n.options.dictCancelUploadConfirmation,function(){return n.removeFile(e)}):n.options.dictRemoveFileConfirmation?t.confirm(n.options.dictRemoveFileConfirmation,function(){
return n.removeFile(e)}):n.removeFile(e)}}(this),f=e.previewElement.querySelectorAll("[data-dz-remove]"),h=[],a=0,d=f.length;a<d;a++)r=f[a],h.push(r.addEventListener("click",i))
return h}},removedfile:function(e){var t
return e.previewElement&&null!=(t=e.previewElement)&&t.parentNode.removeChild(e.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(e,t){var n,i,r,l
if(e.previewElement){for(e.previewElement.classList.remove("dz-file-preview"),l=e.previewElement.querySelectorAll("[data-dz-thumbnail]"),i=0,r=l.length;i<r;i++)n=l[i],n.alt=e.name,n.src=t
return setTimeout(function(t){return function(){return e.previewElement.classList.add("dz-image-preview")}}(this),1)}},error:function(e,t){var n,i,r,l,o
if(e.previewElement){for(e.previewElement.classList.add("dz-error"),"String"!=typeof t&&t.error&&(t=t.error),l=e.previewElement.querySelectorAll("[data-dz-errormessage]"),o=[],i=0,r=l.length;i<r;i++)n=l[i],
o.push(n.textContent=t)
return o}},errormultiple:s,processing:function(e){if(e.previewElement&&(e.previewElement.classList.add("dz-processing"),e._removeLink))return e._removeLink.textContent=this.options.dictCancelUpload},processingmultiple:s,
uploadprogress:function(e,t,n){var i,r,l,o,a
if(e.previewElement){for(o=e.previewElement.querySelectorAll("[data-dz-uploadprogress]"),a=[],r=0,l=o.length;r<l;r++)i=o[r],"PROGRESS"===i.nodeName?a.push(i.value=t):a.push(i.style.width=""+t+"%")
return a}},totaluploadprogress:s,sending:s,sendingmultiple:s,success:function(e){if(e.previewElement)return e.previewElement.classList.add("dz-success")},successmultiple:s,canceled:function(e){return this.emit("error",e,"Upload canceled.")

},canceledmultiple:s,complete:function(e){if(e._removeLink&&(e._removeLink.textContent=this.options.dictRemoveFile),e.previewElement)return e.previewElement.classList.add("dz-complete")},completemultiple:s,
maxfilesexceeded:s,maxfilesreached:s,queuecomplete:s,addedfiles:s,previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'
},n=function(){var e,t,n,i,r,l,o
for(i=arguments[0],n=2<=arguments.length?d.call(arguments,1):[],l=0,o=n.length;l<o;l++){t=n[l]
for(e in t)r=t[e],i[e]=r}return i},t.prototype.getAcceptedFiles=function(){var e,t,n,i,r
for(i=this.files,r=[],t=0,n=i.length;t<n;t++)e=i[t],e.accepted&&r.push(e)
return r},t.prototype.getRejectedFiles=function(){var e,t,n,i,r
for(i=this.files,r=[],t=0,n=i.length;t<n;t++)e=i[t],e.accepted||r.push(e)
return r},t.prototype.getFilesWithStatus=function(e){var t,n,i,r,l
for(r=this.files,l=[],n=0,i=r.length;n<i;n++)t=r[n],t.status===e&&l.push(t)
return l},t.prototype.getQueuedFiles=function(){return this.getFilesWithStatus(t.QUEUED)},t.prototype.getUploadingFiles=function(){return this.getFilesWithStatus(t.UPLOADING)},t.prototype.getAddedFiles=function(){
return this.getFilesWithStatus(t.ADDED)},t.prototype.getActiveFiles=function(){var e,n,i,r,l
for(r=this.files,l=[],n=0,i=r.length;n<i;n++)e=r[n],e.status!==t.UPLOADING&&e.status!==t.QUEUED||l.push(e)
return l},t.prototype.init=function(){var e,n,i,r,l,o,a
for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(t.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),
this.clickableElements.length&&(i=function(e){return function(){return e.hiddenFileInput&&e.hiddenFileInput.parentNode.removeChild(e.hiddenFileInput),e.hiddenFileInput=document.createElement("input"),e.hiddenFileInput.setAttribute("type","file"),
(null==e.options.maxFiles||e.options.maxFiles>1)&&e.hiddenFileInput.setAttribute("multiple","multiple"),e.hiddenFileInput.className="dz-hidden-input",null!=e.options.acceptedFiles&&e.hiddenFileInput.setAttribute("accept",e.options.acceptedFiles),
null!=e.options.capture&&e.hiddenFileInput.setAttribute("capture",e.options.capture),e.hiddenFileInput.style.visibility="hidden",e.hiddenFileInput.style.position="absolute",e.hiddenFileInput.style.top="0",
e.hiddenFileInput.style.left="0",e.hiddenFileInput.style.height="0",e.hiddenFileInput.style.width="0",document.querySelector(e.options.hiddenInputContainer).appendChild(e.hiddenFileInput),e.hiddenFileInput.addEventListener("change",function(){
var t,n,r,l
if(n=e.hiddenFileInput.files,n.length)for(r=0,l=n.length;r<l;r++)t=n[r],e.addFile(t)
return e.emit("addedfiles",n),i()})}}(this))(),this.URL=null!=(o=window.URL)?o:window.webkitURL,a=this.events,r=0,l=a.length;r<l;r++)e=a[r],this.on(e,this.options[e])
return this.on("uploadprogress",function(e){return function(){return e.updateTotalUploadProgress()}}(this)),this.on("removedfile",function(e){return function(){return e.updateTotalUploadProgress()}}(this)),
this.on("canceled",function(e){return function(t){return e.emit("complete",t)}}(this)),this.on("complete",function(e){return function(t){if(0===e.getAddedFiles().length&&0===e.getUploadingFiles().length&&0===e.getQueuedFiles().length)return setTimeout(function(){
return e.emit("queuecomplete")},0)}}(this)),n=function(e){return e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1},this.listeners=[{element:this.element,events:{dragstart:function(e){
return function(t){return e.emit("dragstart",t)}}(this),dragenter:function(e){return function(t){return n(t),e.emit("dragenter",t)}}(this),dragover:function(e){return function(t){var i
try{i=t.dataTransfer.effectAllowed}catch(r){}return t.dataTransfer.dropEffect="move"===i||"linkMove"===i?"move":"copy",n(t),e.emit("dragover",t)}}(this),dragleave:function(e){return function(t){return e.emit("dragleave",t)

}}(this),drop:function(e){return function(t){return n(t),e.drop(t)}}(this),dragend:function(e){return function(t){return e.emit("dragend",t)}}(this)}}],this.clickableElements.forEach(function(e){return function(n){
return e.listeners.push({element:n,events:{click:function(i){return(n!==e.element||i.target===e.element||t.elementInside(i.target,e.element.querySelector(".dz-message")))&&e.hiddenFileInput.click(),!0}
}})}}(this)),this.enable(),this.options.init.call(this)},t.prototype.destroy=function(){var e
return this.disable(),this.removeAllFiles(!0),(null!=(e=this.hiddenFileInput)?e.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,
t.instances.splice(t.instances.indexOf(this),1)},t.prototype.updateTotalUploadProgress=function(){var e,t,n,i,r,l,o,a
if(i=0,n=0,e=this.getActiveFiles(),e.length){for(a=this.getActiveFiles(),l=0,o=a.length;l<o;l++)t=a[l],i+=t.upload.bytesSent,n+=t.upload.total
r=100*i/n}else r=100
return this.emit("totaluploadprogress",r,n,i)},t.prototype._getParamName=function(e){return"function"==typeof this.options.paramName?this.options.paramName(e):""+this.options.paramName+(this.options.uploadMultiple?"["+e+"]":"")

},t.prototype._renameFilename=function(e){return"function"!=typeof this.options.renameFilename?e:this.options.renameFilename(e)},t.prototype.getFallbackForm=function(){var e,n,i,r
return(e=this.getExistingFallback())?e:(i='<div class="dz-fallback">',this.options.dictFallbackText&&(i+="<p>"+this.options.dictFallbackText+"</p>"),i+='<input type="file" name="'+this._getParamName(0)+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>',
n=t.createElement(i),"FORM"!==this.element.tagName?(r=t.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>'),r.appendChild(n)):(this.element.setAttribute("enctype","multipart/form-data"),
this.element.setAttribute("method",this.options.method)),null!=r?r:n)},t.prototype.getExistingFallback=function(){var e,t,n,i,r,l
for(t=function(e){var t,n,i
for(n=0,i=e.length;n<i;n++)if(t=e[n],/(^| )fallback($| )/.test(t.className))return t},l=["div","form"],i=0,r=l.length;i<r;i++)if(n=l[i],e=t(this.element.getElementsByTagName(n)))return e},t.prototype.setupEventListeners=function(){
var e,t,n,i,r,l,o
for(l=this.listeners,o=[],i=0,r=l.length;i<r;i++)e=l[i],o.push(function(){var i,r
i=e.events,r=[]
for(t in i)n=i[t],r.push(e.element.addEventListener(t,n,!1))
return r}())
return o},t.prototype.removeEventListeners=function(){var e,t,n,i,r,l,o
for(l=this.listeners,o=[],i=0,r=l.length;i<r;i++)e=l[i],o.push(function(){var i,r
i=e.events,r=[]
for(t in i)n=i[t],r.push(e.element.removeEventListener(t,n,!1))
return r}())
return o},t.prototype.disable=function(){var e,t,n,i,r
for(this.clickableElements.forEach(function(e){return e.classList.remove("dz-clickable")}),this.removeEventListeners(),i=this.files,r=[],t=0,n=i.length;t<n;t++)e=i[t],r.push(this.cancelUpload(e))
return r},t.prototype.enable=function(){return this.clickableElements.forEach(function(e){return e.classList.add("dz-clickable")}),this.setupEventListeners()},t.prototype.filesize=function(e){var t,n,i,r,l,o,a,s


if(i=0,r="b",e>0){for(o=["TB","GB","MB","KB","b"],n=a=0,s=o.length;a<s;n=++a)if(l=o[n],t=Math.pow(this.options.filesizeBase,4-n)/10,e>=t){i=e/Math.pow(this.options.filesizeBase,4-n),r=l
break}i=Math.round(10*i)/10}return"<strong>"+i+"</strong> "+r},t.prototype._updateMaxFilesReachedClass=function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),
this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")},t.prototype.drop=function(e){var t,n
e.dataTransfer&&(this.emit("drop",e),t=e.dataTransfer.files,this.emit("addedfiles",t),t.length&&(n=e.dataTransfer.items,n&&n.length&&null!=n[0].webkitGetAsEntry?this._addFilesFromItems(n):this.handleFiles(t)))

},t.prototype.paste=function(e){var t,n
if(null!=(null!=e&&null!=(n=e.clipboardData)?n.items:void 0))return this.emit("paste",e),t=e.clipboardData.items,t.length?this._addFilesFromItems(t):void 0},t.prototype.handleFiles=function(e){var t,n,i,r


for(r=[],n=0,i=e.length;n<i;n++)t=e[n],r.push(this.addFile(t))
return r},t.prototype._addFilesFromItems=function(e){var t,n,i,r,l
for(l=[],i=0,r=e.length;i<r;i++)n=e[i],null!=n.webkitGetAsEntry&&(t=n.webkitGetAsEntry())?t.isFile?l.push(this.addFile(n.getAsFile())):t.isDirectory?l.push(this._addFilesFromDirectory(t,t.name)):l.push(void 0):null!=n.getAsFile&&(null==n.kind||"file"===n.kind)?l.push(this.addFile(n.getAsFile())):l.push(void 0)


return l},t.prototype._addFilesFromDirectory=function(e,t){var n,i,r
return n=e.createReader(),i=function(e){return"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log(e):void 0},(r=function(e){return function(){return n.readEntries(function(n){
var i,l,o
if(n.length>0){for(l=0,o=n.length;l<o;l++)i=n[l],i.isFile?i.file(function(n){if(!e.options.ignoreHiddenFiles||"."!==n.name.substring(0,1))return n.fullPath=""+t+"/"+n.name,e.addFile(n)}):i.isDirectory&&e._addFilesFromDirectory(i,""+t+"/"+i.name)


r()}return null},i)}}(this))()},t.prototype.accept=function(e,n){return e.size>1024*this.options.maxFilesize*1024?n(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(e.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):t.isValidFile(e,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(n(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),
this.emit("maxfilesexceeded",e)):this.options.accept.call(this,e,n):n(this.options.dictInvalidFileType)},t.prototype.addFile=function(e){return e.upload={progress:0,total:e.size,bytesSent:0},this.files.push(e),
e.status=t.ADDED,this.emit("addedfile",e),this._enqueueThumbnail(e),this.accept(e,function(t){return function(n){return n?(e.accepted=!1,t._errorProcessing([e],n)):(e.accepted=!0,t.options.autoQueue&&t.enqueueFile(e)),
t._updateMaxFilesReachedClass()}}(this))},t.prototype.enqueueFiles=function(e){var t,n,i
for(n=0,i=e.length;n<i;n++)t=e[n],this.enqueueFile(t)
return null},t.prototype.enqueueFile=function(e){if(e.status!==t.ADDED||e.accepted!==!0)throw new Error("This file can't be queued because it has already been processed or was rejected.")
if(e.status=t.QUEUED,this.options.autoProcessQueue)return setTimeout(function(e){return function(){return e.processQueue()}}(this),0)},t.prototype._thumbnailQueue=[],t.prototype._processingThumbnail=!1,
t.prototype._enqueueThumbnail=function(e){if(this.options.createImageThumbnails&&e.type.match(/image.*/)&&e.size<=1024*this.options.maxThumbnailFilesize*1024)return this._thumbnailQueue.push(e),setTimeout(function(e){
return function(){return e._processThumbnailQueue()}}(this),0)},t.prototype._processThumbnailQueue=function(){if(!this._processingThumbnail&&0!==this._thumbnailQueue.length)return this._processingThumbnail=!0,
this.createThumbnail(this._thumbnailQueue.shift(),function(e){return function(){return e._processingThumbnail=!1,e._processThumbnailQueue()}}(this))},t.prototype.removeFile=function(e){if(e.status===t.UPLOADING&&this.cancelUpload(e),
this.files=u(this.files,e),this.emit("removedfile",e),0===this.files.length)return this.emit("reset")},t.prototype.removeAllFiles=function(e){var n,i,r,l
for(null==e&&(e=!1),l=this.files.slice(),i=0,r=l.length;i<r;i++)n=l[i],(n.status!==t.UPLOADING||e)&&this.removeFile(n)
return null},t.prototype.createThumbnail=function(e,t){var n
return n=new FileReader,n.onload=function(i){return function(){return"image/svg+xml"===e.type?(i.emit("thumbnail",e,n.result),void(null!=t&&t())):i.createThumbnailFromUrl(e,n.result,t)}}(this),n.readAsDataURL(e)

},t.prototype.createThumbnailFromUrl=function(e,t,n,i){var r
return r=document.createElement("img"),i&&(r.crossOrigin=i),r.onload=function(t){return function(){var i,l,o,s,u,d,p,c
if(e.width=r.width,e.height=r.height,o=t.options.resize.call(t,e),null==o.trgWidth&&(o.trgWidth=o.optWidth),null==o.trgHeight&&(o.trgHeight=o.optHeight),i=document.createElement("canvas"),l=i.getContext("2d"),
i.width=o.trgWidth,i.height=o.trgHeight,a(l,r,null!=(u=o.srcX)?u:0,null!=(d=o.srcY)?d:0,o.srcWidth,o.srcHeight,null!=(p=o.trgX)?p:0,null!=(c=o.trgY)?c:0,o.trgWidth,o.trgHeight),s=i.toDataURL("image/png"),
t.emit("thumbnail",e,s),null!=n)return n()}}(this),null!=n&&(r.onerror=n),r.src=t},t.prototype.processQueue=function(){var e,t,n,i
if(t=this.options.parallelUploads,n=this.getUploadingFiles().length,e=n,!(n>=t)&&(i=this.getQueuedFiles(),i.length>0)){if(this.options.uploadMultiple)return this.processFiles(i.slice(0,t-n))
for(;e<t;){if(!i.length)return
this.processFile(i.shift()),e++}}},t.prototype.processFile=function(e){return this.processFiles([e])},t.prototype.processFiles=function(e){var n,i,r
for(i=0,r=e.length;i<r;i++)n=e[i],n.processing=!0,n.status=t.UPLOADING,this.emit("processing",n)
return this.options.uploadMultiple&&this.emit("processingmultiple",e),this.uploadFiles(e)},t.prototype._getFilesWithXhr=function(e){var t,n
return n=function(){var n,i,r,l
for(r=this.files,l=[],n=0,i=r.length;n<i;n++)t=r[n],t.xhr===e&&l.push(t)
return l}.call(this)},t.prototype.cancelUpload=function(e){var n,i,r,l,o,a,s
if(e.status===t.UPLOADING){for(i=this._getFilesWithXhr(e.xhr),r=0,o=i.length;r<o;r++)n=i[r],n.status=t.CANCELED
for(e.xhr.abort(),l=0,a=i.length;l<a;l++)n=i[l],this.emit("canceled",n)
this.options.uploadMultiple&&this.emit("canceledmultiple",i)}else(s=e.status)!==t.ADDED&&s!==t.QUEUED||(e.status=t.CANCELED,this.emit("canceled",e),this.options.uploadMultiple&&this.emit("canceledmultiple",[e]))


if(this.options.autoProcessQueue)return this.processQueue()},r=function(){var e,t
return t=arguments[0],e=2<=arguments.length?d.call(arguments,1):[],"function"==typeof t?t.apply(this,e):t},t.prototype.uploadFile=function(e){return this.uploadFiles([e])},t.prototype.uploadFiles=function(e){
var i,l,o,a,s,u,d,p,c,f,h,m,g,y,v,b,E,_,F,A,T,D,C,w,O,P,k,S,I,U,L,R,N,M
for(F=new XMLHttpRequest,A=0,w=e.length;A<w;A++)i=e[A],i.xhr=F
m=r(this.options.method,e),E=r(this.options.url,e),F.open(m,E,!0),F.withCredentials=!!this.options.withCredentials,v=null,o=function(t){return function(){var n,r,l
for(l=[],n=0,r=e.length;n<r;n++)i=e[n],l.push(t._errorProcessing(e,v||t.options.dictResponseError.replace("{{statusCode}}",F.status),F))
return l}}(this),b=function(t){return function(n){var r,l,o,a,s,u,d,p,c
if(null!=n)for(l=100*n.loaded/n.total,o=0,u=e.length;o<u;o++)i=e[o],i.upload={progress:l,total:n.total,bytesSent:n.loaded}
else{for(r=!0,l=100,a=0,d=e.length;a<d;a++)i=e[a],100===i.upload.progress&&i.upload.bytesSent===i.upload.total||(r=!1),i.upload.progress=l,i.upload.bytesSent=i.upload.total
if(r)return}for(c=[],s=0,p=e.length;s<p;s++)i=e[s],c.push(t.emit("uploadprogress",i,l,i.upload.bytesSent))
return c}}(this),F.onload=function(n){return function(i){var r
if(e[0].status!==t.CANCELED&&4===F.readyState){if(v=F.responseText,F.getResponseHeader("content-type")&&~F.getResponseHeader("content-type").indexOf("application/json"))try{v=JSON.parse(v)}catch(l){i=l,
v="Invalid JSON response from server."}return b(),200<=(r=F.status)&&r<300?n._finished(e,v,i):o()}}}(this),F.onerror=function(n){return function(){if(e[0].status!==t.CANCELED)return o()}}(this),y=null!=(I=F.upload)?I:F,
y.onprogress=b,u={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"},this.options.headers&&n(u,this.options.headers)
for(a in u)s=u[a],s&&F.setRequestHeader(a,s)
if(l=new FormData,this.options.params){U=this.options.params
for(h in U)_=U[h],l.append(h,_)}for(T=0,O=e.length;T<O;T++)i=e[T],this.emit("sending",i,F,l)
if(this.options.uploadMultiple&&this.emit("sendingmultiple",e,F,l),"FORM"===this.element.tagName)for(L=this.element.querySelectorAll("input, textarea, select, button"),D=0,P=L.length;D<P;D++)if(p=L[D],
c=p.getAttribute("name"),f=p.getAttribute("type"),"SELECT"===p.tagName&&p.hasAttribute("multiple"))for(R=p.options,C=0,k=R.length;C<k;C++)g=R[C],g.selected&&l.append(c,g.value)
else(!f||"checkbox"!==(N=f.toLowerCase())&&"radio"!==N||p.checked)&&l.append(c,p.value)
for(d=S=0,M=e.length-1;0<=M?S<=M:S>=M;d=0<=M?++S:--S)l.append(this._getParamName(d),e[d],this._renameFilename(e[d].name))
return this.submitRequest(F,l,e)},t.prototype.submitRequest=function(e,t,n){return e.send(t)},t.prototype._finished=function(e,n,i){var r,l,o
for(l=0,o=e.length;l<o;l++)r=e[l],r.status=t.SUCCESS,this.emit("success",r,n,i),this.emit("complete",r)
if(this.options.uploadMultiple&&(this.emit("successmultiple",e,n,i),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()},t.prototype._errorProcessing=function(e,n,i){
var r,l,o
for(l=0,o=e.length;l<o;l++)r=e[l],r.status=t.ERROR,this.emit("error",r,n,i),this.emit("complete",r)
if(this.options.uploadMultiple&&(this.emit("errormultiple",e,n,i),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()},t}(i),n.version="4.3.0",n.options={},n.optionsForElement=function(e){
return e.getAttribute("id")?n.options[r(e.getAttribute("id"))]:void 0},n.instances=[],n.forElement=function(e){if("string"==typeof e&&(e=document.querySelector(e)),null==(null!=e?e.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.")


return e.dropzone},n.autoDiscover=!0,n.discover=function(){var e,t,i,r,l,o
for(document.querySelectorAll?i=document.querySelectorAll(".dropzone"):(i=[],e=function(e){var t,n,r,l
for(l=[],n=0,r=e.length;n<r;n++)t=e[n],/(^| )dropzone($| )/.test(t.className)?l.push(i.push(t)):l.push(void 0)
return l},e(document.getElementsByTagName("div")),e(document.getElementsByTagName("form"))),o=[],r=0,l=i.length;r<l;r++)t=i[r],n.optionsForElement(t)!==!1?o.push(new n(t)):o.push(void 0)
return o},n.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],n.isBrowserSupported=function(){var e,t,i,r,l
if(e=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(l=n.blacklistedBrowsers,i=0,r=l.length;i<r;i++)t=l[i],
t.test(navigator.userAgent)&&(e=!1)
else e=!1
else e=!1
return e},u=function(e,t){var n,i,r,l
for(l=[],i=0,r=e.length;i<r;i++)n=e[i],n!==t&&l.push(n)
return l},r=function(e){return e.replace(/[\-_](\w)/g,function(e){return e.charAt(1).toUpperCase()})},n.createElement=function(e){var t
return t=document.createElement("div"),t.innerHTML=e,t.childNodes[0]},n.elementInside=function(e,t){if(e===t)return!0
for(;e=e.parentNode;)if(e===t)return!0
return!1},n.getElement=function(e,t){var n
if("string"==typeof e?n=document.querySelector(e):null!=e.nodeType&&(n=e),null==n)throw new Error("Invalid `"+t+"` option provided. Please provide a CSS selector or a plain HTML element.")
return n},n.getElements=function(e,t){var n,i,r,l,o,a,s,u
if(e instanceof Array){r=[]
try{for(l=0,a=e.length;l<a;l++)i=e[l],r.push(this.getElement(i,t))}catch(d){n=d,r=null}}else if("string"==typeof e)for(r=[],u=document.querySelectorAll(e),o=0,s=u.length;o<s;o++)i=u[o],r.push(i)
else null!=e.nodeType&&(r=[e])
if(null==r||!r.length)throw new Error("Invalid `"+t+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.")
return r},n.confirm=function(e,t,n){return window.confirm(e)?t():null!=n?n():void 0},n.isValidFile=function(e,t){var n,i,r,l,o
if(!t)return!0
for(t=t.split(","),i=e.type,n=i.replace(/\/.*$/,""),l=0,o=t.length;l<o;l++)if(r=t[l],r=r.trim(),"."===r.charAt(0)){if(e.name.toLowerCase().indexOf(r.toLowerCase(),e.name.length-r.length)!==-1)return!0}else if(/\/\*$/.test(r)){
if(n===r.replace(/\/.*$/,""))return!0}else if(i===r)return!0
return!1},"undefined"!=typeof e&&null!==e&&(e.fn.dropzone=function(e){return this.each(function(){return new n(this,e)})}),"undefined"!=typeof t&&null!==t?t.exports=n:window.Dropzone=n,n.ADDED="added",
n.QUEUED="queued",n.ACCEPTED=n.QUEUED,n.UPLOADING="uploading",n.PROCESSING=n.UPLOADING,n.CANCELED="canceled",n.ERROR="error",n.SUCCESS="success",o=function(e){var t,n,i,r,l,o,a,s,u,d
for(a=e.naturalWidth,o=e.naturalHeight,n=document.createElement("canvas"),n.width=1,n.height=o,i=n.getContext("2d"),i.drawImage(e,0,0),r=i.getImageData(0,0,1,o).data,d=0,l=o,s=o;s>d;)t=r[4*(s-1)+3],0===t?l=s:d=s,
s=l+d>>1
return u=s/o,0===u?1:u},a=function(e,t,n,i,r,l,a,s,u,d){var p
return p=o(t),e.drawImage(t,n,i,r,l,a,s,u,d/p)},l=function(e,t){var n,i,r,l,o,a,s,u,d
if(r=!1,d=!0,i=e.document,u=i.documentElement,n=i.addEventListener?"addEventListener":"attachEvent",s=i.addEventListener?"removeEventListener":"detachEvent",a=i.addEventListener?"":"on",l=function(n){if("readystatechange"!==n.type||"complete"===i.readyState)return("load"===n.type?e:i)[s](a+n.type,l,!1),
!r&&(r=!0)?t.call(e,n.type||n):void 0},o=function(){var e
try{u.doScroll("left")}catch(t){return e=t,void setTimeout(o,50)}return l("poll")},"complete"!==i.readyState){if(i.createEventObject&&u.doScroll){try{d=!e.frameElement}catch(p){}d&&o()}return i[n](a+"DOMContentLoaded",l,!1),
i[n](a+"readystatechange",l,!1),e[n](a+"load",l,!1)}},n._autoDiscoverFunction=function(){if(n.autoDiscover)return n.discover()},l(window,n._autoDiscoverFunction)}).call(this)}).call(t,n(15),n(34)(e))},function(e,t){
e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{
value:!0})
var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(11),u=i(s),d=n(16),p=i(d),c=n(26),f=i(c),h=n(19),m=i(h),g=function(e){
function t(e){r(this,t)
var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.handleToggleSelect=n.handleToggleSelect.bind(n),n.handleDelete=n.handleDelete.bind(n),n.handleActivate=n.handleActivate.bind(n),n.handleKeyDown=n.handleKeyDown.bind(n),n.handleCancelUpload=n.handleCancelUpload.bind(n),
n.preventFocus=n.preventFocus.bind(n),n}return o(t,e),a(t,[{key:"handleActivate",value:function n(e){e.stopPropagation(),this.props.handleActivate(e,this.props.item)}},{key:"handleToggleSelect",value:function i(e){
e.stopPropagation(),e.preventDefault(),this.props.handleToggleSelect(e,this.props.item)}},{key:"handleDelete",value:function s(e){this.props.handleDelete(e,this.props.item)}},{key:"getThumbnailStyles",
value:function d(){if(this.isImage()&&(this.exists()||this.uploading())){var e=this.props.item.thumbnail||this.props.item.url
return{backgroundImage:"url("+e+")"}}return{}}},{key:"hasError",value:function c(){var c=!1
return Array.isArray(this.props.messages)&&(c=this.props.messages.filter(function(e){return"error"===e.type}).length>0),c}},{key:"getErrorMessage",value:function h(){var e=null
return this.hasError()?e=this.props.messages[0].value:this.exists()||this.uploading()||(e=u["default"]._t("AssetAdmin.FILE_MISSING","File cannot be found")),null!==e?p["default"].createElement("span",{
className:"gallery-item__error-message"},e):null}},{key:"getThumbnailClassNames",value:function m(){var e=["gallery-item__thumbnail"]
return this.isImageSmallerThanThumbnail()&&e.push("gallery-item__thumbnail--small"),e.join(" ")}},{key:"getItemClassNames",value:function g(){var e=["gallery-item gallery-item--"+this.props.item.category]


return this.exists()||this.uploading()||e.push("gallery-item--missing"),this.props.selected&&e.push("gallery-item--selected"),this.props.highlighted&&e.push("gallery-item--highlighted"),this.hasError()&&e.push("gallery-item--error"),
e.join(" ")}},{key:"getStatusFlags",value:function y(){var e=[]
return"folder"!==this.props.item.type&&(this.props.item.draft?e.push(p["default"].createElement("span",{title:u["default"]._t("File.DRAFT","Draft"),className:"gallery-item--draft"})):this.props.item.modified&&e.push(p["default"].createElement("span",{
title:u["default"]._t("File.MODIFIED","Modified"),className:"gallery-item--modified"}))),e}},{key:"isImage",value:function v(){return"image"===this.props.item.category}},{key:"exists",value:function b(){
return this.props.item.exists}},{key:"uploading",value:function E(){return this.props.uploading}},{key:"isImageSmallerThanThumbnail",value:function _(){if(!this.isImage()||!this.exists()&&!this.uploading())return!1


var e=this.props.item.dimensions
return e&&e.height<f["default"].THUMBNAIL_HEIGHT&&e.width<f["default"].THUMBNAIL_WIDTH}},{key:"handleKeyDown",value:function F(e){e.stopPropagation(),f["default"].SPACE_KEY_CODE===e.keyCode&&(e.preventDefault(),
this.handleToggleSelect(e)),f["default"].RETURN_KEY_CODE===e.keyCode&&this.handleActivate(e)}},{key:"preventFocus",value:function A(e){e.preventDefault()}},{key:"handleCancelUpload",value:function T(e){
e.stopPropagation(),this.hasError()?this.props.handleRemoveErroredUpload(this.props.item):this.props.handleCancelUpload(this.props.item)}},{key:"getProgressBar",value:function D(){var e=null,t={className:"gallery-item__progress-bar",
style:{width:this.props.item.progress+"%"}}
return!this.hasError()&&this.uploading()&&(e=p["default"].createElement("div",{className:"gallery-item__upload-progress"},p["default"].createElement("div",t))),e}},{key:"render",value:function C(){var e=this.handleToggleSelect,t="font-icon-tick",n=null


return this.uploading()?(e=this.handleCancelUpload,t="font-icon-cancel"):this.exists()&&(n=p["default"].createElement("div",{className:"gallery-item--overlay font-icon-edit"},"View")),p["default"].createElement("div",{
className:this.getItemClassNames(),"data-id":this.props.item.id,tabIndex:"0",onKeyDown:this.handleKeyDown,onClick:this.handleActivate},p["default"].createElement("div",{ref:"thumbnail",className:this.getThumbnailClassNames(),
style:this.getThumbnailStyles()},n,this.getStatusFlags()),this.getProgressBar(),this.getErrorMessage(),p["default"].createElement("div",{className:"gallery-item__title",ref:"title"},p["default"].createElement("label",{
className:"gallery-item__checkbox-label "+t,onClick:e},p["default"].createElement("input",{className:"gallery-item__checkbox",type:"checkbox",title:u["default"]._t("AssetAdmin.SELECT"),tabIndex:"-1",onMouseDown:this.preventFocus
})),this.props.item.title))}}]),t}(m["default"])
g.propTypes={item:p["default"].PropTypes.shape({dimensions:p["default"].PropTypes.shape({width:p["default"].PropTypes.number,height:p["default"].PropTypes.number}),category:p["default"].PropTypes.string.isRequired,
id:p["default"].PropTypes.number.isRequired,url:p["default"].PropTypes.string,title:p["default"].PropTypes.string.isRequired,progress:p["default"].PropTypes.number}),highlighted:p["default"].PropTypes.bool,
selected:p["default"].PropTypes.bool.isRequired,handleActivate:p["default"].PropTypes.func.isRequired,handleToggleSelect:p["default"].PropTypes.func.isRequired,handleDelete:p["default"].PropTypes.func.isRequired,
messages:p["default"].PropTypes.array,uploading:p["default"].PropTypes.bool},t["default"]=g},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){return{gallery:e.assetAdmin.gallery
}}Object.defineProperty(t,"__esModule",{value:!0}),t.BulkActions=void 0
var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(15),d=i(u),p=n(16),c=i(p),f=n(29),h=i(f),m=n(19),g=i(m),y=n(31),v=i(y),b=n(17),E=t.BulkActions=function(e){
function t(e){r(this,t)
var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.onChangeValue=n.onChangeValue.bind(n),n}return o(t,e),s(t,[{key:"componentDidMount",value:function n(){var e=(0,d["default"])(h["default"].findDOMNode(this)).find(".dropdown")
e.chosen({allow_single_deselect:!0,disable_search_threshold:20}),e.change(function(){return v["default"].Simulate.click(e.find(":selected")[0])})}},{key:"render",value:function i(){var e=this,t=this.props.actions.map(function(t,n){
var i=e.props.items.length&&(!t.canApply||t.canApply(e.props.items))
if(!i)return""
var r=["bulk-actions_action","ss-ui-button","ui-corner-all",t.className||"font-icon-info-circled"].join(" ")
return c["default"].createElement("button",{type:"button",className:r,key:n,onClick:e.onChangeValue,value:t.value},t.label)})
return c["default"].createElement("div",{className:"bulk-actions fieldholder-small"},c["default"].createElement("div",{className:"bulk-actions-counter"},this.props.items.length),t)}},{key:"getOptionByValue",
value:function a(e){return this.props.actions.find(function(t){return t.value===e})}},{key:"onChangeValue",value:function u(e){var t=this,n=null,i=this.getOptionByValue(e.target.value)
return null===i?null:(n="function"==typeof i.confirm?i.confirm(this.props.items).then(function(){return i.callback(t.props.items)}):i.callback(this.props.items)||Promise.resolve(),(0,d["default"])(h["default"].findDOMNode(this)).find(".dropdown").val("").trigger("liszt:updated"),
n)}}]),t}(g["default"])
E.propTypes={items:c["default"].PropTypes.array,actions:c["default"].PropTypes.arrayOf(c["default"].PropTypes.shape({value:c["default"].PropTypes.string.isRequired,label:c["default"].PropTypes.string.isRequired,
className:c["default"].PropTypes.string,destructive:c["default"].PropTypes.bool,callback:c["default"].PropTypes.func,canApply:c["default"].PropTypes.func,confirm:c["default"].PropTypes.func}))},t["default"]=(0,
b.connect)(a)(E)},function(e,t,n){"use strict"
function i(e){return e&&e.__esModule?e:{"default":e}}function r(e){return function(t){return t({type:p["default"].ADD_QUEUED_FILE,payload:{file:e}})}}function l(e,t){return function(n){return n({type:p["default"].FAIL_UPLOAD,
payload:{queuedAtTime:e,messages:t}})}}function o(){return function(e){return e({type:p["default"].PURGE_UPLOAD_QUEUE,payload:null})}}function a(e){return function(t){return t({type:p["default"].REMOVE_QUEUED_FILE,
payload:{queuedAtTime:e}})}}function s(e){return function(t){return t({type:p["default"].SUCCEED_UPLOAD,payload:{queuedAtTime:e}})}}function u(e,t){return function(n){return n({type:p["default"].UPDATE_QUEUED_FILE,
payload:{queuedAtTime:e,updates:t}})}}Object.defineProperty(t,"__esModule",{value:!0}),t.addQueuedFile=r,t.failUpload=l,t.purgeUploadQueue=o,t.removeQueuedFile=a,t.succeedUpload=s,t.updateQueuedFile=u
var d=n(10),p=i(d)},function(e,t){e.exports=ReactApollo},function(e,t){e.exports=ApolloClient},function(e,t){e.exports=GraphQLTag},function(e,t){e.exports=Breadcrumb},function(e,t){e.exports=Toolbar},function(e,t){}])

//# sourceMappingURL=bundle.js.map