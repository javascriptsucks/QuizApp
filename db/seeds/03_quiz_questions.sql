INSERT INTO quiz_questions (quiz_id, question_text, answer_text)
VALUES
(1, 'The full name of the first prime ministers of Canada', 'Sir John Macdonald'),
(1, 'In what year does the Canadian Pacific Railway incorporated between eastern Canada and British Columbia? ', '1881'),
(1, 'Which city hosted the Winter Olympics in 1988?', 'Calgary'),
(1, 'Which city hosted the Olympics in 1976?', 'Montreal'),
(1, 'Which coin was discontinued in Canada in 2013?', 'Penny'),
(1, 'Which country invaded Canada in 1812?', 'United States'),
(1, 'In which year did Canada replace 1 dollar bills with coins?', '1989'),
(1, 'How many years was the CN Tower considered as the world"s tallest building?', '32'),
(1, 'Canada"s maple leaf flag was adopted in which decade?', '1960'),
(1, 'Which province was created at the same time as Saskatchewan?', 'Alberta'),
(2, 'The name of a spartans king, who led Greek city-states defended invasion of Xerxes I in Thermopylae. ', 'Leonidas I'),
(2, 'Who fought in the Hundred Years" War?', 'Britain and France'),
(2, 'What year did India gain independence from Britain?', '1947'),
(2, 'Who was the first ruler of the Mongol Empire?', 'Genghis Khan'),
(2, 'How old was Queen Elizabeth II when she was crowned the Queen of England?', '27'),
(2, 'What year did the French Revolution start?', '1789'),
(2, 'What year did the Internet become available to the public?', '1993'),
(2, 'Greenland was a colony of which country until 1981?', 'Denmark'),
(2, 'Which Russian astronaut was the first man to conduct a spacewalk?', 'Alexey Leonov'),
(2, 'Who is known for running through the streets crying Eureka?', 'Archimedes'),
(3, 'Inside which HTML element do we put the JavaScript codes in?
Please including angle brackets. ', '<script>'),
(3, 'The external JavaScript file must contain the <script> tag. True or false? ', 'false'),
(3, 'How do you round the number 7.25, to the nearest integer?', 'Math.round(7.25)'),
(3, 'Which operator returns true if the two compared values are not equal?', '!=='),
(3, 'Which Object method returns an iterable that can be used to iterate over the property keys of an object?', 'Object.keys()'),
(3, 'What will be logged to the console?
var a = ["dog", "cat", "hen"];\n
a[100] = "fox";\n
console.log(a.length);\n', '101'),
(3, '0 && hi
What Will this expression return? ', '0'),
(3, 'What does the following expression evaluate to? [] == [] ', 'false'),
(3, 'What will be logged to the console?
const x = 6 % 2;\n
const y = x ? "One" : "Two";\n
console.log(y);\n', 'Two'),
(3, 'What is the result of running the statement shown?
let a = 5;\n
console.log(++a);\n', '6'),
(4, 'What value is assigned to total after this code executes?
function sum(num1, num2 = 2, num3 = 3) {\n
  return num1 + num2 + num3;\n
}\n
let values = [1, 5];\n
let total = sum(4, ...values);\n', '10'),
(4, 'What will be the output of the following code snippet?
<script type="text/javascript">a = 5 + "9";\n document.write(a);\n</script>\n
', '59'),
(4, 'What will be the output of the following code snippet?
print(typeof NaN);\n
', 'Number'),
(4, 'How to stop an interval timer in Javascript? Please just spell the name of the method.', 'clearInterval'),
(4, 'What will be the output of the following code.
a=5;\n
b=4;\n
alert(a++(+(+(+b))));\n', '9'),
(4, 'What will this code print to the console?
const myFunc = () => {\n
  const a = 2;\n
  return () => console.log("a is " + a);\n
};\n
const a = 1;\n
const test = myFunc();\n
test();\n', 'a is 2'),
(4, 'What is the output of this code?
var cat = { name: "Athena" };\n

function swap(feline) {\n
  feline.name = "Wild";\n
  feline = { name: "Tabby" };\n
}\n

swap(cat);\n
console.log(cat.name);\n', 'Wild'),
(4, 'What does this code print to the console?\n
let bear = {\n
  sound: "roar",\n
  roar() {\n
    console.log(this.sound);\n
  },\n
};\n

bear.sound = "grunt";\n
let bearSound = bear.roar;\n
bearSound();\n', 'undefined'),
(4, 'What is the output of this code?\n
let scores = [];\n
scores.push(1, 2);\n
scores.pop();\n
scores.push(3, 4);\n
scores.pop();\n
score = scores.reduce((a, b) => a + b);\n
console.log(score);\n
', '4'),
(4, 'What will this code log to the console?\n
console.log(typeof 41.1);\n
', 'number'),
(5, 'What is the vertical gap between the two elements below?\n
<div style="margin-bottom: 2rem;">Div 1</div>\n
<div style="margin-top: 2rem;">Div 2</div>\n', '2rem'),
(5, 'Among these selectors which selector has the highest specificity ranking for selecting the anchor link element?
ul li a\n
a\n
.example a\n
div a\n', '.example a
'),
(5, 'There are many properties that can be used to align elements and create page layouts such as float, position, flexbox and grid. Of these four properties, which one should be used to align a global navigation bar which stays fixed at the top of the page?', 'position'),
(5, 'The values for the font-weight property can be keywords or numbers. For the numbered value below, what is the keyword in font-weight? font-weight: 700;\n
', 'bold'),
(5, 'Which position style places an element at a fixed location within its relative container?\n', 'absolute'),
(5, 'Which CSS keyword can you use to override standard source order and specificity rules? However considered bad practice. ', '!important'),
(5, 'A universal selector is specified using a(n) ___.', '*'),
(5, 'Given this code, how tall will the following element be in pixels?\n
<style>\n
  #tall-text {\n
    display: inline;\n
    font-size: 20px;\n
    height: 200px;\n
  }\n
</style>\n

<p id="tall-text">Did I grow?</p>\n
', '20px'),
(5, 'What color would rgb(255,0,0) give?', 'red'),
(5, 'What is CSS stands for? ', 'Cascading Style Sheet');

