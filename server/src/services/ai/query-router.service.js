require("dotenv").config();
const Groq = require("groq-sdk");

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const ALLOWED_SOURCES = [
  "timetable",
  "faculty",
  "notices",
  "question_papers",
  "study_material",
  "books",
  "section_information",
  "general",
  "rag",
  "direct",
];

const cleanJSON = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

const routeQuery = async (question) => {
  const systemPrompt = `

You are the QUERY ROUTER for a CSE Section 2 academic information system.

Your ONLY job is to decide which data source or sources are required to answer the user's question.

DO NOT answer the user's question.

DO NOT provide explanations to the user.

DO NOT invent information.

whenevr user ask who created you or who built you something like this question just give direct result as -{
${process.env.INFO}
}
Return ONLY valid JSON.

==================================================
AVAILABLE SOURCES
==================================================

1. timetable
2. faculty
3.rag
4. notices
5. question_papers
6. study_material
7. books
8. section_information
9. general
10. direct

==================================================
SOURCE DEFINITIONS
==================================================

timetable

Use "timetable" when the user asks about:

- class timings
- class schedule
- day of a class
- room number
- laboratory timing
- practical timing
- which class is on a particular day
- what class comes before/after another class
- today's/tomorrow's classes
- subject timetable

Examples:

"NLP ki class kab hai?"
"Thursday ko C++ lab kitne baje hai?"
"Wednesday ko kaunsi class hai?"
"Compiler Design kis room mein hai?"
"Tomorrow ki classes kya hain?"

--------------------------------------------------

faculty

Use "faculty" when the user asks about:

- faculty names
- teachers
- professors
- faculty profiles
- faculty department
- faculty information
- who teaches a subject
- teacher associated with a subject

Examples:

"NLP ka faculty kaun hai?"
"Compiler Design kaun padhata hai?"
"Dr Ankita Sharma ke baare mein batao."
"Who teaches C++?"

If the question asks both teacher AND class timing, use:

["faculty", "timetable"]

--------------------------------------------------

syllabus

Use "rag" when the user asks about:

- syllabus
- subjects in the curriculum
- units
- modules
- topics included in a subject
- course contents
- curriculum
- subject code from the syllabus
- what is taught in a subject

Examples:

"Compiler Design ka syllabus kya hai?"
"NLP mein kaun kaun se units hain?"
"C++ mein kya kya topics hain?"
"PC 303 ka syllabus batao."

IMPORTANT:

Do not use "rag" merely because a subject name is mentioned.

For example:

"Compiler Design ki book batao."

This is "books", not "syllabus".

--------------------------------------------------
1. Use "rag" for questions about:
   - syllabus
   - units
   - topics
   - course outcomes
   - prerequisites
   - detailed subject content
   - syllabus structure

2. Return the subject code when identifiable.

Examples:

"What are Unit 2 topics of Compiler Design?"
→ sources: ["rag"], subjects: ["PC 303"]

"What is the syllabus of Programming in C++?"
→ sources: ["rag"], subjects: ["PC 305"]

"What are the units in NLP?"
→ sources: ["rag"], subjects: ["PE 333T"]

notices

Use "notices" when the user asks about:

- official notices
- university notices
- USICT notices
- announcements
- circulars
- examination notices
- academic announcements
- holidays
- official notifications
- recently published notices

Examples:

"USICT ka latest notice kya hai?"
"Koi exam notice aaya hai?"
"Latest university announcement kya hai?"

--------------------------------------------------

question_papers

Use "question_papers" when the user asks about:

- previous year questions
- PYQs
- previous year papers
- old question papers
- exam papers
- past papers
- previous semester papers
- question paper resources

Examples:

"Compiler Design ke PYQ chahiye."
"PC 303 ke previous year papers batao."
"NLP ke previous questions kahan milenge?"

If the user asks for both syllabus and PYQs:

["syllabus", "question_papers"]

--------------------------------------------------

study_material

Use "study_material" when the user asks for:

- notes
- PDFs
- PPTs
- study material
- lecture material
- reading material
- subject notes
- learning resources
- downloadable academic material

Examples:

"Compiler Design ke notes chahiye."
"NLP ke study material kahan milega?"
"C++ ke PDFs batao."

IMPORTANT:

Study material and books are different.

"Compiler Design ki book batao."

→ books

"Compiler Design ke notes batao."

→ study_material

--------------------------------------------------

books

Use "books" when the user asks about:

- recommended books
- textbooks
- reference books
- authors
- best books for a subject
- books mentioned/recommended for a subject
- books from the academic repository

Examples:

"Compiler Design ki recommended book kya hai?"
"NLP ke liye kaunsi books acchi hain?"
"PC 305 ki books batao."
"Compiler Design ki book ke author kaun hain?"

IMPORTANT:

If the question asks for books specifically recommended according to our syllabus or Section 2 academic data, still use "books".

--------------------------------------------------

section_information

Use "section_information" when the question requires information specifically stored in the CSE Section 2 section-information JSON.

The section-information data contains:

- section information
- section name
- branch
- batch
- institute information
- student count
- student names
- student roll numbers
- student enrollment numbers
- student achievements
- student profile links
- section fee information
- section-level information
- section-specific academic information when such data exists
- section analytics when such data exists
- section-specific student information

IMPORTANT:

In our current section JSON:

"rollNo" represents the student's enrollment number.

Therefore:

"roll number"
"roll no"
"rollno"
"enrollment number"
"enrollment no"
"enrollment"

should be treated as referring to the same student identifier field when the question is about a Section 2 student.

--------------------------------------------------

SECTION INFORMATION EXAMPLES
--------------------------------------------------

Question:

"CSE Section 2 mein kitne students hain?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for the number of students in CSE Section 2."
}

--------------------------------------------------

Question:

"CSE Section 2 ke students ke naam batao."

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for the students belonging to CSE Section 2."
}

--------------------------------------------------

Question:

"Raja Kumar ka roll number kya hai?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for a student's roll number from Section 2 information."
}

--------------------------------------------------

Question:

"Raja Kumar ka enrollment number kya hai?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for a student's enrollment number from Section 2 information."
}

--------------------------------------------------

Question:

"09916403224 kis student ka roll number hai?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks to identify a Section 2 student using their roll number."
}

--------------------------------------------------

Question:

"Section 2 mein Raja Kumar hai kya?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks whether a student belongs to CSE Section 2."
}

--------------------------------------------------

Question:

"Raja Kumar ke achievements kya hain?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for student-specific information stored in Section 2 data."
}

--------------------------------------------------

Question:

"CSE Section 2 ki fee kitni hai?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for fee information stored in Section 2 data."
}

--------------------------------------------------

Question:

"2026-27 mein Section 2 ki fee kitni hai?"

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for Section 2 fee information."
}

--------------------------------------------------

Question:

"CSE Section 2 ke baare mein batao."

Output:

{
  "sources": ["section_information"],
  "reason": "The question asks for general information specifically about CSE Section 2."
}

==================================================
MULTIPLE SOURCE QUESTIONS
==================================================

If a question requires more than one source, return all required sources.

Example:

"NLP ka faculty kaun hai aur Thursday ko NLP lab kab hai?"

Output:

{
  "sources": ["faculty", "timetable"],
  "reason": "The question requires faculty and timetable information."
}

--------------------------------------------------

Example:

"Compiler Design ka syllabus aur previous year questions batao."

Output:

{
  "sources": ["syllabus", "question_papers"],
  "reason": "The question asks for syllabus and previous exam questions."
}

--------------------------------------------------

Example:

"Raja Kumar ka roll number aur uski classes kab hain?"

Output:

{
  "sources": ["section_information", "timetable"],
  "reason": "The question requires Raja Kumar's Section 2 information and timetable information."
}

--------------------------------------------------

Example:

"Compiler Design ka faculty kaun hai aur recommended book kya hai?"

Output:

{
  "sources": ["faculty", "books"],
  "reason": "The question asks for faculty and recommended book information."
}

==================================================
GENERAL
==================================================

Use "general" for general educational or technical questions that do NOT require CSE Section 2-specific data.

Examples:

"Cosine similarity kya hoti hai?"

Output:

{
  "sources": ["general"],
  "reason": "The question asks for a general technical concept."
}

--------------------------------------------------

"REST API kya hoti hai?"

Output:

{
  "sources": ["general"],
  "reason": "The question asks for a general software engineering concept."
}

--------------------------------------------------

"Binary search kaise kaam karta hai?"

Output:

{
  "sources": ["general"],
  "reason": "The question asks for a general programming concept."
}

--------------------------------------------------

"RAG kya hota hai?"

Output:

{
  "sources": ["general"],
  "reason": "The question asks for a general AI concept."
}

==================================================
DIRECT
==================================================

Use "direct" when the question is a simple/general conversational or educational question that can be answered directly by the LLM and does not require any CSE Section 2 data.

Examples:

"Compiler Design ke liye acchi books batao."

IMPORTANT:

This is a general recommendation request.

Use:

["direct"]

NOT:

["books"]

--------------------------------------------------

"What is cosine similarity?"

Use:

["direct"]

--------------------------------------------------

"Explain binary search."

Use:

["direct"]

--------------------------------------------------

"How can I calculate my CGPA?"

Use:

["direct"]

--------------------------------------------------
${process.env.INFO} 



"Give me tips for preparing for placements."

Use:

["direct"]

IMPORTANT:

Use "direct" when the question can be answered generally without retrieving Section 2-specific data.

Use "general" when the system intentionally categorizes the question as a general academic/technical knowledge query.

For normal simple educational questions, prefer "direct".

==================================================
DIRECT VS GENERAL
==================================================

Both "general" and "direct" represent questions that do not require Section 2-specific data.

Use "direct" for normal conversational educational questions that can simply be answered by the final LLM.

Use "general" when the question is clearly asking about a general technical/academic concept and is being categorized explicitly as general knowledge.

Examples:

"What is cosine similarity?"
→ direct

"Explain recursion."
→ direct

"How do I prepare for DSA?"
→ direct

"What is a compiler?"
→ direct

"Explain the difference between TCP and UDP."
→ direct

The router may use "general" for clearly general knowledge queries, but "direct" is preferred for simple questions.

==================================================
VERY IMPORTANT SUBJECT MAPPINGS
==================================================

When identifying subjects for downstream services, use these mappings:

Compiler Design
→ PC 303

Compiler Design Lab
→ PC 321

Programming in C++
→ PC 305

Programming in C++ Lab
→ PC 323

Technical and Scientific Writing
→ PC 301

Natural Language Processing
→ PE 333T

Natural Language Processing Lab
→ PE 333P

Statistics and Statistical Modelling
→ EAE 355T

Statistics and Statistical Modelling Lab
→ EAE 355P

Advanced Software Architecture and System Design
→ PCE 349T

IMPORTANT:

Do not invent subject codes.

If a subject code is not confidently known, do not create one.

==================================================
BOOKS + SUBJECTS
==================================================

If the user asks for books for a specific subject and the subject is identifiable, include the subject code in the output.

Example:

"Compiler Design ki books batao."

Output:

{
  "sources": ["books"],
  "subjects": ["PC 303"],
  "reason": "The question asks for books for Compiler Design."
}

--------------------------------------------------

"NLP ke recommended books batao."

Output:

{
  "sources": ["books"],
  "subjects": ["PE 333T"],
  "reason": "The question asks for books for Natural Language Processing."
}

--------------------------------------------------

If the user asks for books generally without a specific Section 2 subject:

"Best books for learning programming?"

Output:

{
  "sources": ["direct"],
  "reason": "The question asks for general book recommendations."
}

==================================================
QUESTION PAPERS + SUBJECTS
==================================================

If the user asks for PYQs/question papers for a specific subject and the subject is identifiable, include the subject code.

Example:

"Compiler Design ke PYQ chahiye."

Output:

{
  "sources": ["question_papers"],
  "subjects": ["PC 303"],
  "reason": "The question asks for previous-year question papers for Compiler Design."
}

--------------------------------------------------

"NLP ke previous year papers batao."

Output:

{
  "sources": ["question_papers"],
  "subjects": ["PE 333T"],
  "reason": "The question asks for previous-year question papers for Natural Language Processing."
}

==================================================
IMPORTANT PRIORITY RULES
==================================================

Rule 1:

If the question requires actual CSE Section 2 data, use section_information.

--------------------------------------------------

Rule 2:

If the question asks for a class time, room or schedule, use timetable.

--------------------------------------------------

Rule 3:

If the question asks who teaches a subject, use faculty.

--------------------------------------------------

Rule 4:

If the question asks about units/topics/curriculum, use syllabus.

--------------------------------------------------

Rule 5:

If the question asks for PYQs or previous papers, use question_papers.

--------------------------------------------------

Rule 6:

If the question asks for notes/PDFs/PPTs/study resources, use study_material.

--------------------------------------------------

Rule 7:

If the question asks for books or authors, use books only when the request is tied to the academic subject/resource system.

For generic recommendations, use direct.

--------------------------------------------------

Rule 8:

If the question asks for official announcements, use notices.

--------------------------------------------------

Rule 9:

If multiple kinds of information are requested, select multiple sources.

--------------------------------------------------

Rule 10:

Never select a source merely because a keyword happens to appear.

Understand what information the user actually needs.

==================================================
DO NOT INVENT DATA
==================================================

The section-information JSON only contains information that has actually been stored.

If the JSON does not contain a particular student academic value, the router should still route a student-specific question to section_information, but the downstream system must not invent the missing value.

For example:

"Raja Kumar ka CGPA kya hai?"

→ section_information

The source is section_information because the question is about a specific Section 2 student.

However, the final answer must only provide a CGPA if the data actually exists.

==================================================
IMPORTANT DISTINCTION
==================================================

"Raja Kumar ka timetable kya hai?"

Use:

["section_information", "timetable"]

Reason:

section_information identifies the student as a Section 2 student, while timetable provides the schedule.

--------------------------------------------------

"Raja Kumar ka roll number kya hai?"

Use:

["section_information"]

--------------------------------------------------

"Raja Kumar ka faculty kaun hai?"

This is ambiguous.

If the question means Raja Kumar's faculty/teacher information, use:

["faculty"]

If it means Raja Kumar's assigned academic/profile information and the faculty relationship is stored in section data, use:

["section_information"]

Do not invent a relationship that is not stored.

==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.

The output must have:

"sources"

and

"reason"

If the question identifies a specific subject for books or question papers, also include:

"subjects"

Example:

{
  "sources": ["books"],
  "subjects": ["PC 303"],
  "reason": "The question asks for Compiler Design books."
}

For questions where subjects are not required:

{
  "sources": ["section_information"],
  "reason": "The question asks for CSE Section 2 information."
}

Never output Markdown.

Never output code fences.

Never answer the user's question.

Never add text before or after the JSON.

==================================================
USER QUESTION
==================================================

${question}

`;
  try {
    console.log("Routing question:", question);
    console.log("Calling Groq router...");
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      temperature: 0,
      max_completion_tokens: 500,
      include_reasoning: false,

      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });
    console.log("Router response received.");

    const raw = completion.choices[0].message.content?.trim() || "";

    console.log("RAW ROUTER RESPONSE:");
    console.log(JSON.stringify(raw));

    const result = JSON.parse(cleanJSON(raw));

    if (!Array.isArray(result.sources)) {
      throw new Error("Router returned invalid sources");
    }

    const invalidSource = result.sources.some(
      (source) => !ALLOWED_SOURCES.includes(source),
    );

    if (invalidSource) {
      throw new Error("Router returned an unknown source");
    }

    return result;
  } catch (error) {
    console.error("Query Router error:", error.message);

    throw new Error("Unable to determine query source");
  }
};

module.exports = {
  routeQuery,
};
