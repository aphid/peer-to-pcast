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
   var json = {
        "id": "1",
        "name": "Sack, W.",
        "children": [{
            "id": "2",
            "name": "Mark Deckert",
            "data": {
                "paper": "System demonstration: Metavid. org: a social website and open archive of congressional video",
                "relation": "coauthor"            
        },
        "children" : [{
            "id": "3",
            "name": "Stern, A.",
            "data": {
                "paper": "System demonstration: Metavid. org: a social website and open archive of congressional video",
                "relation": "coauthor"
            },
            "children": []
        }, {
        
        
        "id": "4",
            "name": "Dale, M.",
            "data": {
                "paper": "System demonstration: Metavid. org: a social website and open archive of congressional video",
                "relation": "coauthor"
            },
            "children": []

        
        
        }]
    }, {
            "id": "3",
            "name": "Stern, A.",
            "data": {
                "paper": "System demonstration: Metavid. org: a social website and open archive of congressional video",
                "relation": "coauthor"
               }, 
            "children" : [{
            "id": "4",
            "name": "Dale, m.",
            "data": {
                "paper": "System demonstration: Metavid. org: a social website and open archive of congressional video",
                "relation": "coauthor"
            },
            "children": []
        }]
        } , {
        
        "id": "4",
            "name": "Dale, M.",
            "data": {
                "paper": "System demonstration: Metavid. org: a social website and open archive of congressional video",
                "relation": "coauthor"
               }

        
        
        }
    ]};    
    var graph = '[{id:"1", adjacencies:["node0"]}, {id:"node0", name:"node0 name", data:{"some other key":"some other value"}, adjacencies:["node1", "node2", "node3", "node4", "node5"]}, {id:"node1", name:"node1 name", data:{"some other key":"some other value"}, adjacencies:["node0", "node2", "node3", "node4", "node5"]}, {id:"node2", name:"node2 name", data:{"some other key":"some other value"}, adjacencies:["node0", "node1", "node3", "node4", "node5"]}, {id:"node3", name:"node3 name", data:{"some other key":"some other value"}, adjacencies:["node0", "node1", "node2", "node4", "node5"]}, {id:"node4", name:"node4 name", data:{"some other key":"some other value"}, adjacencies:["node0", "node1", "node2", "node3", "node5"]}, {id:"node5", name:"node5 name", data:{"some other key":"some other value"}, adjacencies:["node0", "node1", "node2", "node3", "node4"]}, {id:"4619_46", adjacencies:["190_0"]}, {id:"236585_30", adjacencies:["190_0"]}, {id:"131161_18", adjacencies:["190_0"]}, {id:"41529_12", adjacencies:["190_0"]}]';
    //end
    //init RGraph
    var rgraph = new $jit.RGraph({
        'injectInto': 'infovis',
        //Optional: Create a background canvas
        //for painting concentric circles.
        'background': {
          'CanvasStyles': {
            'strokeStyle': '#555',
            'shadowBlur': 50,
            'shadowColor': '#ccc'
          }
        },
        //Set Edge and Node colors.
        Node: {
            color: '#ddeeff',
            overridable:true
        },

        Edge: {
            overridable:true,
            color: '#C17878',
            lineWidth:1.5
        },
        //Add the node's name into the label
        //This method is called only once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
        },

        //Change the node's style based on its position.
        //This method is called each time a label is rendered/positioned
        //during an animation.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';

            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ccc";
            
            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#494949";
            
            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data.
    rgraph.loadJSON(json);
    /*
    //add some extra edges to the tree
    //to make it a graph (just for fun)
    rgraph.graph.addAdjacence({
        'id': '236585_30'
    }, {
        'id': '236583_23'
    }, null);
    rgraph.graph.addAdjacence({
        'id': '236585_30'
    }, {
        'id': '4619_46'
    }, null);
    */
    //Compute positions and plot
    rgraph.refresh();
    //end
    
    //Global Options
    //Define a function that returns the selected duration
    function getDuration() {
        var sduration = document.getElementById('select-duration');
        var sdindex = sduration.selectedIndex;
        return parseInt(sduration.options[sdindex].text);
    }
    //Define a function that returns the selected fps
    function getFPS() {
        var fpstype = document.getElementById('select-fps');
        var fpsindex = fpstype.selectedIndex;
        return parseInt(fpstype.options[fpsindex].text);
    }
    //Define a function that returns whether you have to
    //hide labels during the animation or not.
    function hideLabels() {
        return document.getElementById('hide-labels').checked;
    }
    
    //init handlers
    //Add event handlers to the right column controls.
 
    //Remove Nodes
    var button = $jit.id('remove-nodes');
    button.onclick = function() {
        //get animation type.
        var stype = $jit.id('select-type-remove-nodes');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //get node ids to be removed.
        var n = rgraph.graph.getNode('236797_5');
        if(!n) return;
        var subnodes = n.getSubnodes(0);
        var map = [];
        for (var i = 0; i < subnodes.length; i++) {
            map.push(subnodes[i].id);
        }
        //perform node-removing animation.
        rgraph.op.removeNode(map.reverse(), {
            type: type,
            duration: getDuration(),
            fps: getFPS(),
            hideLabels:hideLabels()
        });
    };

    //Remove edges
    button = $jit.id('remove-edges');
    button.onclick = function() {
        //get animation type.
        var stype = $jit.id('select-type-remove-edges');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform edge removing animation.
        rgraph.op.removeEdge([['236585_30', "190_0"], ['236585_30', '4619_46']], {
            type: type,
            duration: getDuration(),
            fps: getFPS(),
            hideLabels: hideLabels()
        });
    };

    //Add a Graph (Sum)
    button = $jit.id('sum');
    button.onclick = function(){
        //get graph to add.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = $jit.id('select-type-sum');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform sum animation.
        rgraph.op.sum(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("sum complete!");
            }
        });
    };

    //Morph
    button = $jit.id('morph');
    button.onclick = function(){
        //get graph to morph to.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = $jit.id('select-type-morph');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform morphing animation.
        rgraph.op.morph(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("morph complete!");
            }
        });
    };
    //end
}
