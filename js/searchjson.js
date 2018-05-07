 var u=window.u||{};
 u.isArray=function(o) {
  return typeof o=='object'&&Object.prototype.toString.call(o).slice(8,-1).toLowerCase()=='array';
 };
/**
  * 对json数组进行搜索
  * @param {array} array [需要排序的数组]
  * @param {string} type [需要检索的字段]
  * @param {string} value [字段中应包含的值]
  * @return {array}    [包含指定信息的数组]
  */
 u.search=function(array,type,value) {
  if(!u.isArray(array)) throw new Error('第一个参数必须是数组类型');
  var arr=[];
  arr=array.filter(function(a) { 
   return a[type].toString().indexOf(value)!=-1;
  });
  return arr;
 };