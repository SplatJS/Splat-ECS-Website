// Github API stuff
var xhr = new XMLHttpRequest();
xhr.onreadystatechange=function(){
	if(xhr.readyState==4 && xhr.status==200){
		var contributors = JSON.parse(xhr.responseText);
		var content = "";
		for (var i = 0; i < contributors.length; i++){
			var contributions = ' contributions';
			if (contributors[i].contributions === 1){
				contributions = ' contribution';
			}
			content += '<a class="person" href="http://github.com/' + contributors[i].login + '"><img src="' + contributors[i].avatar_url + '" class="image-responsive" /><div class="info">@'+ contributors[i].login +'<br/>' + contributors[i].contributions + contributions +'</div></a>';
		}
		var contrib = document.getElementById("contrib");
		contrib.innerHTML = content;
	}
}
xhr.open("GET","https://api.github.com/repositories/46762138/contributors",true);
xhr.setRequestHeader("Accept","application/json");
xhr.setRequestHeader("Origin","http://localhost:3000");

xhr.send();

var xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange=function(){
	if(xhr2.readyState==4 && xhr2.status==200){
		var commits = JSON.parse(xhr2.responseText);
		var commitMessage = document.getElementById("commitMessage");
		commitMessage.innerHTML =
		'Updated '
		+ ' '
		+ moment(commits[0].commit.committer.date).format('ll')
		+ ' &mdash; '
		+ commits[0].commit.message;

	}
}
xhr2.open("GET","https://api.github.com/repositories/46762138/commits",true);
xhr2.setRequestHeader("Accept","application/json");
xhr2.setRequestHeader("Origin","http://localhost:3000");

xhr2.send();


// function getLastCommitDate(repoID){
// 	var xhr2 = new XMLHttpRequest();
// 	xhr2.onreadystatechange=function(){
// 		if(xhr2.readyState==4 && xhr2.status==200){
// 			console.log(data);
// 			var data = JSON.parse(xhr2.responseText);
// 			return  moment(data.updated_at).format('ll');
// 		}
// 	}
// 	xhr2.open("GET",repoID,true);
// 	xhr2.setRequestHeader("Accept","application/json");
// 	xhr2.setRequestHeader("Origin","http://localhost:3000");
//
// 	xhr2.send();
// }
//
//
// console.log(getLastCommitDate("https://api.github.com/TwoScoopGames/Cluster-Junk"));

// Handlebars stuff
var gameTemplate = Handlebars.compile(document.getElementById('game-template').innerHTML);
document.getElementById('games').innerHTML = gameTemplate(games);
