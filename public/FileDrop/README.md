FileDrop
========

Another drag and drop fil upload focused on simplicity.


Demo here : http://demo.jlb.ninja/FileDrop/example/filedrop.html. 


Usage : 

```javascript
var node=document.getElementById('filedrop');
var urlUpload= 'post.php';
var options={
	sucess: function(data) {
		console.debug(data);
	}
}

var uploader=new FileDrop(node, urlUpload, options);
```

