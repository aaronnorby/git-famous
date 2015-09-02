

//Pull in API data that makes the request


var getStars = function(searchTerm, cb) {
   $.ajax({
     url: 'https://api.github.com/search/repositories?q=language:' + searchTerm + '&sort=stars&order=desc',
     type: 'GET',
     contentType: 'application/json', 
     success: cb(data), 

     failure: function(error) {
	     console.error(error);
     }
     }); 
};

var Repos = Backbone.Model.extend(
);

var SearchCollection = Backbone.Collection.extend({
  model: Repos,
  parse: function(data) {
           return data.items;
  },
  url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc'
});

var search = new SearchCollection();
search.fetch({
         success: function(collection) { console.log(collection);},
         error: function() { console.log('error');}
          });

var SearchView = Backbone.View.extend({
  initialize: function() {
    this.model.on('update', this.render, this);
  },

  render: function() {
    this.$el.html('<div></div>');
    this.$el.find('div').append(this.model.map(function(repo) {
debugger;
        return '<div class="pam">' + 'Name: ' + repo.get('name') + ' : ' + 'Description: ' + repo.get('description') + ' | ' + 'Stars: ' +  repo.get('stargazers_count') + ' | ' + 'Forks: ' + repo.get('forks_count') + ' | ' + 'Watchers: ' + repo.get('watchers') +  '</div>'; 
    }));
    return this.$el;
  }

});

var searchResult = new SearchView({model: search});
$('#repo').append(searchResult.render());

