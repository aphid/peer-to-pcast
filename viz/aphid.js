var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
 var json = 

{
   "name" : "Deckert, M.",
   "children" : [
      {
         "name" : "Herring, S.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Discourse architectures: designing and visualizing computer mediated conversation"
         },
         "id" : 0
      },
      {
         "name" : "Garcia-Flores, J.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "The semantics of involvement: mining the web to locate biomedical expertise"
         },
         "id" : 1
      },
      {
         "name" : "Orsay, C.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "The semantics of involvement: mining the web to locate biomedical expertise"
         },
         "id" : 2
      },
      {
         "name" : "Deckert, M.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Enabling peer review of expert testimony within government proceedings, Intrusion Detection Subversion: A Survey, System demonstration: Metavid. org: a social website and open archive of congressional video, The semantics of involvement: mining the web to locate biomedical expertise"
         },
         "id" : 3
      },
      {
         "name" : "Bennett, R.E.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Method and system for interactive computer science testing, anaylsis and feedback"
         },
         "id" : 4
      },
      {
         "name" : "Kelly, J.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Searching the Net for Differences of Opinion"
         },
         "id" : 5
      },
      {
         "name" : "Turner, W.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "The semantics of involvement: mining the web to locate biomedical expertise"
         },
         "id" : 6
      },
      {
         "name" : "Dale, M.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Searching the Net for Differences of Opinion, System demonstration: Metavid. org: a social website and open archive of congressional video"
         },
         "id" : 7
      },
      {
         "name" : "Soloway, E.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "From PROUST to CHIRON: ITS Design as Iterative Engineering; Intermediate Results are Important!"
         },
         "id" : 8
      },
      {
         "name" : "Stern, A.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Enabling peer review of expert testimony within government proceedings, System demonstration: Metavid. org: a social website and open archive of congressional video"
         },
         "id" : 9
      },
      {
         "name" : "Hurault-Plantet, M.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "The semantics of involvement: mining the web to locate biomedical expertise"
         },
         "id" : 10
      },
      {
         "name" : "Sack, W.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Discourse diagrams: Interface design for very large-scale conversations, What Does a Very Large-Scale Conversation Look Like? Artificial Dialectics and the Graphical Summarization of Large Volumes of E-Mail, On the computation of point of view, Finding errors by overlooking them, Enabling peer review of expert testimony within government proceedings, Indexing Multimedia by Ideology, Network aesthetics, Method and system for interactive computer science testing, anaylsis and feedback, Design for very large-scale conversations, Stories and social networks, Searching the Net for Differences of Opinion, Discourse architecture and very large-scale conversation, From PROUST to CHIRON: ITS Design as Iterative Engineering; Intermediate Results are Important!, IDIC: Assembling video sequences from story plans and content annotations, Agonistics: A Language Game, Artificial human nature, Representing and recognizing point of view, Conversation map: a content-based Usenet newsgroup browser, Discourse architectures: designing and visualizing computer mediated conversation, System demonstration: Metavid. org: a social website and open archive of congressional video, Aesthetics of information visualization, Actor-role analysis: ideology, point of view, and the news, Knowledge base compilation and the language design game, Actor-Role Analysis: Ideology, Point of View, and the News, The questioning news system, Future News: Constructing the Audience Constructing the News, Conversation map: An interface for very large-scale conversations"
         },
         "id" : 11
      },
      {
         "name" : "Davis, M.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "IDIC: Assembling video sequences from story plans and content annotations"
         },
         "id" : 12
      },
      {
         "name" : "Erickson, T.",
         "data" : {
            "relation" : "coauthor",
            "paper" : "Discourse architectures: designing and visualizing computer mediated conversation"
         },
         "id" : 13
      },
      {
         "children" : [
            {
               "id" : "1"
            }
         ],
         "id" : "6"
      },
      {
         "children" : [
            {
               "id" : "3"
            }
         ],
         "id" : "6"
      },
      {
         "children" : [
            {
               "id" : "10"
            }
         ],
         "id" : "6"
      },
      {
         "children" : [
            {
               "id" : "2"
            }
         ],
         "id" : "6"
      },
      {
         "children" : [
            {
               "id" : "3"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "7"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "9"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "12"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "8"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "4"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "0"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "13"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "5"
            }
         ],
         "id" : "11"
      },
      {
         "children" : [
            {
               "id" : "6"
            }
         ],
         "id" : "3"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "3"
      },
      {
         "children" : [
            {
               "id" : "1"
            }
         ],
         "id" : "3"
      },
      {
         "children" : [
            {
               "id" : "7"
            }
         ],
         "id" : "3"
      },
      {
         "children" : [
            {
               "id" : "9"
            }
         ],
         "id" : "3"
      },
      {
         "children" : [
            {
               "id" : "10"
            }
         ],
         "id" : "3"
      },
      {
         "children" : [
            {
               "id" : "2"
            }
         ],
         "id" : "3"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "7"
      },
      {
         "children" : [
            {
               "id" : "3"
            }
         ],
         "id" : "7"
      },
      {
         "children" : [
            {
               "id" : "9"
            }
         ],
         "id" : "7"
      },
      {
         "children" : [
            {
               "id" : "5"
            }
         ],
         "id" : "7"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "9"
      },
      {
         "children" : [
            {
               "id" : "3"
            }
         ],
         "id" : "9"
      },
      {
         "children" : [
            {
               "id" : "7"
            }
         ],
         "id" : "9"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "12"
      },
      {
         "children" : [
            {
               "id" : "6"
            }
         ],
         "id" : "2"
      },
      {
         "children" : [
            {
               "id" : "1"
            }
         ],
         "id" : "2"
      },
      {
         "children" : [
            {
               "id" : "3"
            }
         ],
         "id" : "2"
      },
      {
         "children" : [
            {
               "id" : "10"
            }
         ],
         "id" : "2"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "8"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "4"
      },
      {
         "children" : [
            {
               "id" : "6"
            }
         ],
         "id" : "1"
      },
      {
         "children" : [
            {
               "id" : "3"
            }
         ],
         "id" : "1"
      },
      {
         "children" : [
            {
               "id" : "10"
            }
         ],
         "id" : "1"
      },
      {
         "children" : [
            {
               "id" : "2"
            }
         ],
         "id" : "1"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "0"
      },
      {
         "children" : [
            {
               "id" : "13"
            }
         ],
         "id" : "0"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "13"
      },
      {
         "children" : [
            {
               "id" : "0"
            }
         ],
         "id" : "13"
      },
      {
         "children" : [
            {
               "id" : "6"
            }
         ],
         "id" : "10"
      },
      {
         "children" : [
            {
               "id" : "1"
            }
         ],
         "id" : "10"
      },
      {
         "children" : [
            {
               "id" : "3"
            }
         ],
         "id" : "10"
      },
      {
         "children" : [
            {
               "id" : "2"
            }
         ],
         "id" : "10"
      },
      {
         "children" : [
            {
               "id" : "11"
            }
         ],
         "id" : "5"
      },
      {
         "children" : [
            {
               "id" : "7"
            }
         ],
         "id" : "5"
      }
   ],
   "data" : {
      "relation" : "coauthor",
      "paper" : "Enabling peer review of expert testimony within government proceedings, Intrusion Detection Subversion: A Survey, System demonstration: Metavid. org: a social website and open archive of congressional video, The semantics of involvement: mining the web to locate biomedical expertise"
   },
   "id" : 3
}
;    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: w,
      height: h,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00"
      },
      Edge: {
          lineWidth: 2,
          color: "#088"
      },
      onBeforeCompute: function(node){
          Log.write("centering");
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          domElement.innerHTML = node.name;
          $jit.util.addEvent(domElement, 'click', function () {
              ht.onClick(node.id, {
                  onComplete: function() {
                      ht.controller.onComplete();
                  }
              });
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
          if (node._depth <= 1) {
              style.fontSize = "0.8em";
              style.color = "#ddd";

          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#555";

          } else {
              style.display = 'none';
          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';
      },
      
      onComplete: function(){
          Log.write("done");
          
          //Build the right column relations list.
          //This is done by collecting the information (stored in the data property) 
          //for all the nodes adjacent to the centered node.
          var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
              if (child.data) {
                  var rel = (child.data.paper == node.name) ? child.data.relation : node.data.relation;
                  html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + child.data.relation + " of " + child.data.paper + ")</div></li>";
              }
          });
          html += "</ul>";
          $jit.id('inner-details').innerHTML = html;
      }
    });
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onComplete();
}
