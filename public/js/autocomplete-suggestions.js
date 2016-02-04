var suggestions = [
{
  text: 'grandparent1',
  suggestions: [{
    text: 'parent1',
    suggestions: [{
      text: 'child1',
    }, {
      text: 'child2',
    }, {
      text: 'child3',
    }]
  }]
},

{
  text: 'grandparent2',
  suggestions: [{
    text: 'parent2',
    suggestions: [{
      text: 'child4',
    }, {
      text: 'child5',
    }, {
      text: 'child6',
    }]
  }]
},

{
  text: 'grandparent3',
  suggestions: [{
    text: 'parent3',
    suggestions: [{
      text: 'child7',
    }, {
      text: 'child8',
    }, {
      text: 'child9',
    }]
  }]
}];

window.autoCompleteSuggestions = suggestions;