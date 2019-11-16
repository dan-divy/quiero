/**
 *  Querio v0.1 - Divy Srivastava
 *  A markup language designed for teachers, professors and students to
 *  create structures question sets.
 */ 
const log = console.log;  // Make life simpler
//  All querio programs are saved in the .quio extensions
const ext = ".quio";

var variables = [];

/**
 * @name InputStream
 * @description returns utility functions for the input.
 * @param {string} input 
 * @private api
 */
function InputStream(input) { 
    var col = 0, line = 1, pos = 0;
    return {
        next: next,
        peek: peek,
        eof: eof,
        crspruce: crspruce,
        raw: input,
        setPos:setPos
    }
    // Get next character
    function next() {
        var ch = input.charAt(pos++);
        if (ch == "\n") line++ , col = 0; else col++;
         return ch;
    }
    // Get the current character
    function peek() {
        return input.charAt(pos);
    }
    function setPos(val) {
        return pos = val;
    }
    // Checks if line has ended
    function eof() {
        if (peek() == "\n") {
                return true;
        }
        else return false;
    }
    // Emits an error for {string} msg
    function crspruce(msg) {
        throw new Error(msg + " (" + line + ":" + col + ")");
    }
};

/**
 * @name TokenStream
 * @description Parses the input
 * @param {object} input 
 */
function TokenStream(input) {
   // Define tokens
    var TOKEN = {
        "question": "@",
        "option": "#",
        "answer": "*",
        "defination": ":",
        parenthesis: "{",
        string: ["\"","\'"]
    };
    // Read the characters escaped
    function read_escaped(end) {
        var escaped = false, str = "";
        input.next();
        while (!input.eof()) {
            var ch = input.next();
            if (escaped) {
                str += ch;
                escaped = false;
            } else if (ch == "\\") {
                escaped = true;
            } else if (ch == end) {
                break;
            } else {
                str += ch;
            }
        }
        return str;
    }
    // Check for a whitespace
    function is_whitespace(ch) {
        if (" \t\n".indexOf(ch) >= 0) {
         return true
        }
    }
    // Read characters until...
     function read_while(predicate) {
        var str = "";
        while (!input.eof() && predicate(input.peek()))
            str += input.next();
        return str;
     }
    // Parse the question
    function read_question() {      
        var ch = read_escaped("\n");
        log({
            type: "Question",
            value: ch
        })
        input.next()
        return ch;
    }
    // Parse the answer
    function read_answer() {
        input.next();
        var isNumber = parseInt(input.next());
        if (typeof isNumber  == "number") {
            var ch = read_escaped("\n");
            log({
                type: "Answer",
                value: ch,
                index: isNumber
            })
            input.next()
            return ch;
        }
      
    }
    function read_defination(position) {
        read_while(is_whitespace);
        var count_backwards = 1;
        var count_forwards = 1;
        while (input.raw.charAt(position - count_backwards) == " ")  {
            count_backwards++;
        }
       while (input.raw.charAt(position + count_forwards) == " ")  {
            count_forwards++;
        }
        var varToAssign = input.raw.charAt(position - count_backwards);
        var valueOfVar = input.raw.charAt(position + count_forwards);
        variables.push({
            name:varToAssign,
            value:valueOfVar
        })
        log(variables)
        
    };
    function read_brackets() {
        var content = read_escaped('}');
        return variables.find(function (x) { return x.name == content }, content);
    };
    function parseString(content) {
        log(content)
        if (content.indexOf('{') > -1) {
            log(content.indexOf('{'))
            log(content)
            log(read_brackets())
        }
        else return content;
    }
    function read_string(ch) {
        var content = read_escaped(ch);
        parseString(content)
        
    }
    // Main parser
    function read() {
        read_while(is_whitespace)
        if (!input.eof) return { msg: "Done" };
        var ch = input.peek();
        var def_pos = input.raw.indexOf(':');
        if (def_pos !== -1) {
            read_defination(def_pos)
        }
        if (TOKEN.string.includes(ch)) {
            read_string(ch);
        }
        if (ch == TOKEN.parenthesis) {
            read_brackets();
        }
        if (ch == TOKEN.question) {
              read_question();
        } else if (ch == TOKEN.option) {
            read_answer();
        } 
    }
    // Call the parser
    read()
}

// A example program written in Quiero
var sample_program = `
    x : 2
    y : 1
    {y}
    {x}
    "This is a {x} string"
    'Another string'
    @Who is the current Prime Minister of India?
        #1 Narendra Modi
        #2 Divy
        #3 Dan
        #4 Aadi
    @What kind of question was that?
        #1 Silly
        #2 Stupid
        #3 Cringy
        #4 Funny
`
function Quiero(text) {
    // Running the program!
    text.split("\n").map((a, b) => {
        TokenStream(InputStream(`${a}\n`));
    })
}