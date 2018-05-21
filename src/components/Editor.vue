<template>
  <div id='ed'>
    <h2>Create blogpost</h2>
	<br>
	Blog title: <input type="text" v-model="name" placeholder="Blog title">
	<br>
	<br>
	Blog preview sentence: <input type="text" v-model="preview" placeholder="One sentence preview/description of blog">
	<br>
	<br>
	Blog category: <select id='category' v-model="category">
				  <option value='Growing your network'>Growing your network</option>
				  <option value='Know your network'>Know your network</option>
				  <option value='Stay in touch with your network'>Stay in touch with your network</option>
			  </select>
	<br>
	<br>
	Blog cover image (must be 16:9, ideally 515x257): <vue-base64-file-upload 
        class="v1"
        accept="image/png,image/jpeg"
        image-class="v1-image"
        input-class="v1-input"
		disable-preview=true
		placeholder="Choose cover picture"
        @load="onImgLoad" />
	<br>
	<br>
    <wysiwyg v-model="html" />
    <button id='save' @click='uploadPost'>Save</button>    
  </div>
</template>

<script>
export default {
	name: "editor",
	data: function() {
		return {
			name:"",
			html: "",
			cover:"",
			preview:"",
			category:""
		};
	}, 
	methods:{
		onImgLoad:function(dataURI){
			this.cover = dataURI;
		},
		uploadPost:function(){
			document.querySelector('#save').disabled = true;
			document.querySelector('#save').textContent = 'Uploading...';
			fetch("/newBlogPost",
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					credentials: "same-origin",
					method: "POST",
					body: JSON.stringify({name:this.name,html: this.html,preview:this.preview,cover:this.cover,category:this.category})
				})
				.then(function(res){ 
					console.log(res);
					window.location.href = '/blogs';
				 })
				.catch(function(res){ console.log(res);document.querySelector('#save').disabled = false; })
		}
	}
};
</script>

<style>
#ed {
	width: 80%;
	margin-left: 10%;
}

input[type='text'],input[type='file'],select{
	border-radius: 5px;
	width:30% !important;
}

#save {
	display: inline-block;
	padding: 0.3em 1.2em;
	margin: 0 0.3em 0.3em 0;
	border-radius: 2em;
	box-sizing: border-box;
	text-decoration: none;
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	color: black;
	background-color: #e6f14e;
	text-align: center;
	transition: all 0.2s;
	margin-top: 20px;
	cursor: pointer;
}
#save:hover {
	background-color: rgb(198, 196, 64);
}
</style>
