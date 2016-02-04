var langTools = ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");

//editor.session.setMode("ace/mode/html");
editor.setTheme("ace/theme/tomorrow");

// enable autocompletion and snippets
editor.setOptions({
  //enableBasicAutocompletion: true,
  //enableSnippets: true,
  enableLiveAutocompletion: true
});

function getCurrentWord(text, position) {
  var lines = text.split('\n'),
      line = lines[position.row],
      word = '',
      index = position.column - 1;

  while(index >= 0 && line[index] != ' ') {
    word = line[index] + word;
    index --;
  }

  return word;
}

function getSuggestions(expression) {
  // parts can be:
  // 1) [''] => level:1
  // 2) ['string', ''] => level:2
  var parts = expression.split('.'),
      query = parts[parts.length - 1],
      levelDepth = parts.length - 1,
      levelIndex = 0,
      levelSuggestions = autoCompleteSuggestions;

  while (levelIndex < levelDepth && _.isUndefined(levelSuggestions) === false) {
    var nextLevelIndex = _.findIndex(levelSuggestions, function(suggestion) {
      return suggestion.text = parts[levelIndex];
    });

    levelSuggestions = levelSuggestions[nextLevelIndex].suggestions;
    levelIndex ++;
  }

  if (_.isUndefined(levelSuggestions) === true) {
    return [];
  }

  return _.filter(levelSuggestions, function(suggestion) {
    return _.indexOf(suggestion.text.toLowerCase(), query.toLowerCase()) !== -1;
  });
}

var autoCompleter = {
  getCompletions: function(editor, session, pos, prefix, callback) {
    if (prefix.length === 0) {
      return callback(null, []);
    }

    var currentWord = getCurrentWord(editor.getValue(), pos),
        suggestions = getSuggestions(currentWord);

    callback(null, suggestions.map(function(suggestion) {
      return {
        name: suggestion.text,
        value: suggestion.text,
        score: suggestion.text,
        meta: 'service'
      };
    }));
  }
};

langTools.addCompleter(autoCompleter);