<template>
  <div id='ed'>
	Blog title: <input type="text" v-model="name" placeholder="Blog title">
	<br>
	<br>
	Blog preview sentence: <input type="text" v-model="preview" placeholder="One sentence preview/description of blog">
	<br>
	<br>
	Blog category: 
	<br>
	<br>
	<select id='category' v-model="category">				  
			  </select>
	<br>
	<br>
	Add new category: <input type="text" id='newCategory' placeholder="Add new category"><button id='addCategory' @click='addCategory'>Add</button>
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
import axios from "axios";

export default {
	name: "editor",
	data: function() {
		return {
			_id: "",
			name: "",
			html: "",
			cover: "",
			preview: "",
			category: "",
			newCategory: ""
		};
	},
	mounted: function() {
		axios
			.get("/categories")
			.then(response => {
				response.data.forEach(cat => {
					document.querySelector("#category").innerHTML = document.querySelector("#category").innerHTML + `<option value='${cat.name}'>${cat.name}</option>`;
				});

				if (document.querySelector("#editedBlog")) {
					this._id = document.querySelector("#editedBlogID").innerHTML;
					this.name = document.querySelector("#editedBlogName").innerHTML;
					this.preview = document.querySelector("#editedBlogPreview").innerHTML;
					this.cover = document.querySelector("#editedBlogCover").innerHTML;
					this.category = document.querySelector("#editedBlogCategory").innerHTML;
					this.html = document.querySelector("#editedBlogHTML").innerHTML;
				}
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		onImgLoad: function(dataURI) {
			this.cover = dataURI;
		},
		uploadPost: function() {
			document.querySelector("#save").disabled = true;
			document.querySelector("#save").textContent = "Uploading...";
			fetch("/newBlogPost", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				credentials: "same-origin",
				method: "POST",
				body: JSON.stringify({ _id: this._id, name: this.name, html: this.html, preview: this.preview, cover: this.cover, category: this.category })
			})
				.then(function(res) {
					console.log(res);
					window.location.href = "/blogs";
				})
				.catch(function(err) {
					console.log(err);
					document.querySelector("#save").disabled = false;
				});
		},
		addCategory: function() {
			let newCategory = document.querySelector("#newCategory").value;
			document.querySelector("#newCategory").value = "";
			document.querySelector("#category").innerHTML = document.querySelector("#category").innerHTML + `<option value='${newCategory}'>${newCategory}</option>`;
			this.category = newCategory;
			fetch("/categories", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				credentials: "same-origin",
				method: "POST",
				body: JSON.stringify({ name: newCategory })
			})
				.then(function(res) {
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				});
		}
	}
};
</script>

<style>
#ed {
	width: 80%;
	margin-left: 10%;
}

input[type="text"],
input[type="file"],
select {
	border-radius: 5px;
	width: 30% !important;
}

#save,
#addCategory {
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
	cursor: pointer;
}

#save {
	margin-top: 20px;
}

#save:hover {
	background-color: rgb(198, 196, 64);
}
</style>
