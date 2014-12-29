function GC()
{

}



GC.inherit=function(child, parentClass) {

	for(var name in parentClass.prototype) {
		if(typeof(child.prototype[name])==='undefined') {
			child.prototype[name]=parentClass.prototype[name];
		}
	}
}
