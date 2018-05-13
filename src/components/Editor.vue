<template>
  <div id='ed'>
    <h2>Create blogpost</h2>
	<input type="text" v-model="blogName" placeholder="Blog name">
    <wysiwyg v-model="myHTML" />
    <a id='save' @click='uploadPost'>Save</a>    
  </div>
</template>

<script>
export default {
	name: "editor",
	data: function() {
		return {
			blogName:"",
			myHTML: ""
		};
	}, 
	methods:{
		uploadPost:function(){
			fetch("/newBlogPost",
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					credentials: "same-origin",
					method: "POST",
					body: JSON.stringify({blogName:this.blogName,myHTML: this.myHTML})
				})
				.then(function(res){ 
					console.log(res);
					window.location.href = '/blogs';
				 })
				.catch(function(res){ console.log(res) })
		}
	}
};
</script>

<style>
#ed {
	width: 80%;
	margin-left: 10%;
	margin-top: 5%;
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
