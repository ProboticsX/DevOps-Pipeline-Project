const esprima = require("esprima");
const escodegen = require("escodegen");
const options = {tokens:true, tolerant: true, loc: true, range: true };
const fs = require("fs");
const chalk = require('chalk');

let operations = [ConditionalBoundary,IncrementalMutations, NegateConditionals,
                  ConditionalExpression,CloneReturn,EmptyString, ConstantReplace ]

function rewrite( filepath, newPath ) {

    var buf = fs.readFileSync(filepath, "utf8");
    var ast = esprima.parse(buf, options);    

    var operation_function = getRandomInt(operations.length);

    let op = operations[operation_function];    // Use Random Generator to get function name
    console.log(op);
    op(ast);

    let code = escodegen.generate(ast);
    fs.writeFileSync( newPath, code);
}

// All 8 functions for operators

function ConditionalBoundary(ast) {
    operation_list = [[">",">="],["<","<="]]
    let random_operator = getRandomInt(operation_list.length)
    let from_operator=operation_list[random_operator][0]
    let to_operator=operation_list[random_operator][1]
    expr = "BinaryExpression"
    Expression_Condition(expr,ast,from_operator,to_operator)
}

function IncrementalMutations(ast){
    operator = "++"
    let candidates = 0;
    traverseWithParents(ast, (node) => {
        if( node.type === "UpdateExpression" && node.operator === operator) {
            candidates++;
        }
    })

    let mutateTarget = getRandomInt(candidates);
    let current = 0;
    traverseWithParents(ast, (node) => {
        if( node.type === "UpdateExpression"  && node.operator === operator ) {
            if( current === mutateTarget ) {
                if (node.prefix==true) {
                    node.prefix = false
                    console.log( chalk.red(`Replacing ++j with j++ on line ${node.loc.start.line}` ));
            
                }
                else {
                    node.operator = "--"
                    console.log( chalk.red(`Replacing i++ with i-- on line ${node.loc.start.line}` ));
                }
            }
            current++;
        }

    })
}



function ConditionalExpression(ast) {
    operation_list = [["&&","||"],["||","&&"]]
    let random_operator = getRandomInt(operation_list.length)
    let from_operator=operation_list[random_operator][0]
    let to_operator=operation_list[random_operator][1]
    expr = "LogicalExpression"
    Expression_Condition(expr,ast,from_operator,to_operator)
}

function NegateConditionals(ast) {

    let operation_list = [["==","!="],[">","<"]];
    let get_random_operator = getRandomInt(operation_list.length)
    let from_opertion = operation_list[get_random_operator][0]
    let to_operation = operation_list[get_random_operator][1]
    expr = "BinaryExpression"
    Expression_Condition(expr,ast,from_opertion,to_operation)
}


function CloneReturn(ast){
    let candidates = [];
    traverseWithParents(ast, (node) => {
        if(node.type === "FunctionDeclaration"){
            funcStart = node.loc.start.line;
            lineStart = -1;
            for (n in node.body.body){
                if (node.body.body[n].type === "VariableDeclaration"){ 
                    for (i in node.body.body[n].declarations){
                        if (node.body.body[n].declarations[i].id.name === "embeddedHtml"){
                            lineStart = node.body.body[n].declarations[i].id.loc.start.line;
                            }
                    }
                }
                if (node.body.body[n].type === "ReturnStatement" && node.body.body[n].argument.name === "embeddedHtml"){
                    return_line = node.body.body[n].loc.start.line;
                    return_body = node.body.body[n];
                    if (lineStart == -1){
                        candidates.push([funcStart,return_line,funcStart]);
                    }
                    else{
                        candidates.push([lineStart,return_line,funcStart]);
                    }
                }
            }
        }
    })

    let mutateTarget = getRandomInt(candidates.length);
    traverseWithParents(ast, (node) => {
        if(node.type === "FunctionDeclaration" && node.loc.start.line == candidates[mutateTarget][2]){
            randomCondition = getRandomInt(node.body.body.length);
            if (node.body.body[randomCondition].loc.start.line<=candidates[mutateTarget][0]){
                randomCondition++;
            }
            insertPosition = node.body.body[randomCondition].loc.start.line;
            node.body.body.splice(randomCondition,0,return_body);
            console.log(`Clone Return`)
            console.log(chalk.magenta("Inserting return at line",insertPosition));
            return
        }
    })
}

function EmptyString(ast){
    let candidates = 0;
    traverseWithParents(ast, (node) => {
        if( node.value === "") {
            candidates++;
        }
    })

    let mutateTarget = getRandomInt(candidates);
    let current = 0;
    traverseWithParents(ast, (node) => {
        if( node.value === "" ) {
            if( current === mutateTarget ) { 
                node.value = "<div>Bug</div>"
                node.raw="\"<div>Bug</div>\""
                console.log("Empty string")
                console.log( chalk.green(`Replacing Empty string with <div>Bug</div> on line`,chalk.bold(node.loc.start.line) ));
                
            }
            current++;
        }
    })
}

function ConstantReplace(ast){
    let candidates = 0;
    traverseWithParents(ast, (node) => {
        if( node.value === 0 ) {
            candidates++;
        }
    })

    let mutateTarget = getRandomInt(candidates);
    let current = 0;
    traverseWithParents(ast, (node) => {
        if( node.value === 0 ) {
            if( current === mutateTarget ) {
                node.value = 3
                console.log("Constant-0")
                console.log( chalk.red(`Replacin 0 with 3 on line ${node.loc.start.line}` ));
            }
            current++;
        }
    })
}

// Helper function

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


function Expression_Condition(expr,ast,from_operator,to_operator){
    let candidates = 0;
    traverseWithParents(ast, (node) => {
        if( node.type === expr && node.operator === from_operator ) {
            candidates++;
        }
    })

    let mutateTarget = getRandomInt(candidates);
    let current = 0;
    traverseWithParents(ast, (node) => {
        if( node.type === expr && node.operator === from_operator ) {
            if( current === mutateTarget ) {
                node.operator = to_operator
                console.log(`${from_operator} to ${to_operator} `)
                console.log( chalk.red(`Replacing ${from_operator} with ${to_operator} on line ${node.loc.start.line}` ));
            }
            current++;
        }
    })
}


rewrite("marqdown.js", 
"marqdown-mod.js")

// HELPER

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// A function following the Visitor pattern.
// Annotates nodes with parent objects.
function traverseWithParents(object, visitor)
{
    var key, child;

    visitor.call(null, object);

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent') 
            {
            	child.parent = object;
					traverseWithParents(child, visitor);
            }
        }
    }
}

// Helper function for counting children of node.
function childrenLength(node)
{
	var key, child;
	var count = 0;
	for (key in node) 
	{
		if (node.hasOwnProperty(key)) 
		{
			child = node[key];
			if (typeof child === 'object' && child !== null && key != 'parent') 
			{
				count++;
			}
		}
	}	
	return count;
}


// Helper function for checking if a node is a "decision type node"
function isDecision(node)
{
	if( node.type == 'IfStatement' || node.type == 'ForStatement' || node.type == 'WhileStatement' ||
		 node.type == 'ForInStatement' || node.type == 'DoWhileStatement')
	{
		return true;
	}
	return false;
}

// Helper function for printing out function name.
function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	v}
	return "anon function @" + node.loc.start.line;
}