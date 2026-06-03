export type LessonMeta = {
  id: string;
  title: string;
  lessonUnits: string;
  blockTitle: string;
  year: 10 | 11;
};

export type SubjectCurriculum = {
  label: string;
  examBoard: string;
  lessonsPerWeek: number;
  lessons: LessonMeta[];
};

export const CURRICULUM: Record<"english" | "maths", SubjectCurriculum> = {
  english: {
    label: "English Language & Literature",
    examBoard: "AQA",
    lessonsPerWeek: 3,
    lessons: [
    {
        "id": "english.y10.l01-03",
        "title": "An Inspector Calls - Context",
        "lessonUnits": "1–3",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l04-05",
        "title": "An Inspector Calls - Act 1",
        "lessonUnits": "4–5",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l06-07",
        "title": "An Inspector Calls - Act 2",
        "lessonUnits": "6–7",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l08-09",
        "title": "An Inspector Calls - Act 2 Conflict",
        "lessonUnits": "8–9",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l10-11",
        "title": "An Inspector Calls - Act 3",
        "lessonUnits": "10–11",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l12",
        "title": "Character Studies",
        "lessonUnits": "12",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l13-14",
        "title": "Themes and Motifs",
        "lessonUnits": "13–14",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l15",
        "title": "Context and Exam Questions",
        "lessonUnits": "15",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l16-17",
        "title": "Descriptive Writing Techniques",
        "lessonUnits": "16–17",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l18",
        "title": "Descriptive Writing Draft",
        "lessonUnits": "18",
        "blockTitle": "An Inspector Calls and Paper 1 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l19",
        "title": "Anthology Introduction",
        "lessonUnits": "19",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l20",
        "title": "Ozymandias and London",
        "lessonUnits": "20",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l21",
        "title": "My Last Duchess and Charge",
        "lessonUnits": "21",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l22",
        "title": "Bayonet Charge and Poppies",
        "lessonUnits": "22",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l23",
        "title": "Anthology Poem Study",
        "lessonUnits": "23",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l24",
        "title": "Anthology Poem Study II",
        "lessonUnits": "24",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l25",
        "title": "Anthology Poem Study III",
        "lessonUnits": "25",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l26-27",
        "title": "Comparative Poetry Analysis",
        "lessonUnits": "26–27",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l28",
        "title": "Context and Thematic Links",
        "lessonUnits": "28",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l29-30",
        "title": "Contextual Thematic Study",
        "lessonUnits": "29–30",
        "blockTitle": "Power and Conflict Poetry",
        "year": 10 as const
    },
    {
        "id": "english.y10.l31",
        "title": "Introduction to Unseen Poetry",
        "lessonUnits": "31",
        "blockTitle": "Unseen Poetry and Paper 2 Writing",
        "year": 10 as const
    },
    {
        "id": "english.y10.l32",
        "title": "Approaching Unseen Poems",
        "lessonUnits": "32",
        "blockTitle": "Unseen Poetry and Paper 2 Writing",
        "year": 10 as const
    },
    {
        "id": "english.y10.l33",
        "title": "Comparing Unseen Poems",
        "lessonUnits": "33",
        "blockTitle": "Unseen Poetry and Paper 2 Writing",
        "year": 10 as const
    },
    {
        "id": "english.y10.l34",
        "title": "Non-Fiction Forms",
        "lessonUnits": "34",
        "blockTitle": "Unseen Poetry and Paper 2 Writing",
        "year": 10 as const
    },
    {
        "id": "english.y10.l35",
        "title": "Speeches and Letters",
        "lessonUnits": "35",
        "blockTitle": "Unseen Poetry and Paper 2 Writing",
        "year": 10 as const
    },
    {
        "id": "english.y10.l36",
        "title": "Articles and Opinion Pieces",
        "lessonUnits": "36",
        "blockTitle": "Unseen Poetry and Paper 2 Writing",
        "year": 10 as const
    },
    {
        "id": "english.y10.l37-39",
        "title": "Literature Revision Consolidation",
        "lessonUnits": "37–39",
        "blockTitle": "Paper 1 Revision and Consolidation",
        "year": 10 as const
    },
    {
        "id": "english.y10.l40-42",
        "title": "Reviewing An Inspector Calls",
        "lessonUnits": "40–42",
        "blockTitle": "Paper 1 Revision and Consolidation",
        "year": 10 as const
    },
    {
        "id": "english.y10.l43-44",
        "title": "Reviewing Anthology Poems",
        "lessonUnits": "43–44",
        "blockTitle": "Paper 1 Revision and Consolidation",
        "year": 10 as const
    },
    {
        "id": "english.y10.l45-46",
        "title": "Reviewing Unseen Poetry",
        "lessonUnits": "45–46",
        "blockTitle": "Paper 1 Revision and Consolidation",
        "year": 10 as const
    },
    {
        "id": "english.y10.l47-48",
        "title": "Exam Practice Timed Essays",
        "lessonUnits": "47–48",
        "blockTitle": "Paper 1 Revision and Consolidation",
        "year": 10 as const
    },
    {
        "id": "english.y10.l49-50",
        "title": "Further Exam Practice",
        "lessonUnits": "49–50",
        "blockTitle": "Paper 1 Revision and Consolidation",
        "year": 10 as const
    },
    {
        "id": "english.y10.l51-52",
        "title": "Paper 1 Section A Question Types",
        "lessonUnits": "51–52",
        "blockTitle": "Paper 1 Reading Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l53-54",
        "title": "Language and Structure Analysis",
        "lessonUnits": "53–54",
        "blockTitle": "Paper 1 Reading Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l55-56",
        "title": "Macbeth - Context Introduction",
        "lessonUnits": "55–56",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l57-58",
        "title": "Macbeth - Act 1",
        "lessonUnits": "57–58",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l59-60",
        "title": "Macbeth - Act 2",
        "lessonUnits": "59–60",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l61-62",
        "title": "Macbeth - Act 3",
        "lessonUnits": "61–62",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l63-64",
        "title": "Macbeth - Act 4",
        "lessonUnits": "63–64",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l65",
        "title": "Macbeth - Act 5",
        "lessonUnits": "65",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l66-67",
        "title": "Paper 2 Section A Reading",
        "lessonUnits": "66–67",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l68-69",
        "title": "Reading Comprehension Strategies",
        "lessonUnits": "68–69",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l70",
        "title": "Analysing Language and Structure",
        "lessonUnits": "70",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l71",
        "title": "Past Paper Reading Practice",
        "lessonUnits": "71",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l72",
        "title": "Peer Review Reading Responses",
        "lessonUnits": "72",
        "blockTitle": "Macbeth and Paper 2 Language Skills",
        "year": 10 as const
    },
    {
        "id": "english.y10.l73-77",
        "title": "Macbeth and Poetry Consolidation",
        "lessonUnits": "73–77",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y10.l78-80",
        "title": "Comparative Poetry and Themes",
        "lessonUnits": "78–80",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y10.l81-83",
        "title": "Timed Essay Exam Practice",
        "lessonUnits": "81–83",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y10.l84-86",
        "title": "Paper 1 and 2 Writing Skills",
        "lessonUnits": "84–86",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y10.l87-90",
        "title": "Year 10 General Recap",
        "lessonUnits": "87–90",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y10.l91-100",
        "title": "Literature Reinforcement",
        "lessonUnits": "91–100",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y10.l101-104",
        "title": "Language Skills Reinforcement",
        "lessonUnits": "101–104",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y10.l105-108",
        "title": "Comparative and Final Review",
        "lessonUnits": "105–108",
        "blockTitle": "Literature and Language Review",
        "year": 10 as const
    },
    {
        "id": "english.y11.l01-02",
        "title": "A Christmas Carol - Introduction",
        "lessonUnits": "1–2",
        "blockTitle": "A Christmas Carol and Paper 2 Skills",
        "year": 11 as const
    },
    {
        "id": "english.y11.l03-06",
        "title": "Character Analysis",
        "lessonUnits": "3–6",
        "blockTitle": "A Christmas Carol and Paper 2 Skills",
        "year": 11 as const
    },
    {
        "id": "english.y11.l07-10",
        "title": "Themes and Motifs",
        "lessonUnits": "7–10",
        "blockTitle": "A Christmas Carol and Paper 2 Skills",
        "year": 11 as const
    },
    {
        "id": "english.y11.l11-13",
        "title": "Writer's Methods",
        "lessonUnits": "11–13",
        "blockTitle": "A Christmas Carol and Paper 2 Skills",
        "year": 11 as const
    },
    {
        "id": "english.y11.l14-15",
        "title": "Essay Writing Practice",
        "lessonUnits": "14–15",
        "blockTitle": "A Christmas Carol and Paper 2 Skills",
        "year": 11 as const
    },
    {
        "id": "english.y11.l16",
        "title": "Paper 2 Skills Overview",
        "lessonUnits": "16",
        "blockTitle": "A Christmas Carol and Paper 2 Skills",
        "year": 11 as const
    },
    {
        "id": "english.y11.l17-18",
        "title": "Reading Comprehension",
        "lessonUnits": "17–18",
        "blockTitle": "A Christmas Carol and Paper 2 Skills",
        "year": 11 as const
    },
    {
        "id": "english.y11.l25-28",
        "title": "Anthology Poems 1-5",
        "lessonUnits": "25–28",
        "blockTitle": "Power and Conflict and Unseen Poetry",
        "year": 11 as const
    },
    {
        "id": "english.y11.l29-30",
        "title": "Unseen Poetry Skills",
        "lessonUnits": "29–30",
        "blockTitle": "Power and Conflict and Unseen Poetry",
        "year": 11 as const
    },
    {
        "id": "english.y11.l31-32",
        "title": "Poems 6-10 Analysis",
        "lessonUnits": "31–32",
        "blockTitle": "Power and Conflict and Unseen Poetry",
        "year": 11 as const
    },
    {
        "id": "english.y11.l33-34",
        "title": "Contextual Comparison",
        "lessonUnits": "33–34",
        "blockTitle": "Power and Conflict and Unseen Poetry",
        "year": 11 as const
    },
    {
        "id": "english.y11.l35",
        "title": "Unseen Poetry Practice",
        "lessonUnits": "35",
        "blockTitle": "Power and Conflict and Unseen Poetry",
        "year": 11 as const
    },
    {
        "id": "english.y11.l36-38",
        "title": "Reading Fiction",
        "lessonUnits": "36–38",
        "blockTitle": "Paper 1 Explorations in Creative Reading and Writing",
        "year": 11 as const
    },
    {
        "id": "english.y11.l39-43",
        "title": "Narrative Structure",
        "lessonUnits": "39–43",
        "blockTitle": "Paper 1 Explorations in Creative Reading and Writing",
        "year": 11 as const
    },
    {
        "id": "english.y11.l44-46",
        "title": "Descriptive Writing",
        "lessonUnits": "44–46",
        "blockTitle": "Paper 1 Explorations in Creative Reading and Writing",
        "year": 11 as const
    },
    {
        "id": "english.y11.l47-48",
        "title": "Creative Writing",
        "lessonUnits": "47–48",
        "blockTitle": "Paper 1 Explorations in Creative Reading and Writing",
        "year": 11 as const
    },
    {
        "id": "english.y11.l49-52",
        "title": "Key Texts Revision",
        "lessonUnits": "49–52",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    },
    {
        "id": "english.y11.l53-54",
        "title": "Practice Papers",
        "lessonUnits": "53–54",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    },
    {
        "id": "english.y11.l55-60",
        "title": "Targeted Revision",
        "lessonUnits": "55–60",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    },
    {
        "id": "english.y11.l61-62",
        "title": "Paper 2 Revision",
        "lessonUnits": "61–62",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    },
    {
        "id": "english.y11.l63-64",
        "title": "Further Practice Papers",
        "lessonUnits": "63–64",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    },
    {
        "id": "english.y11.l65",
        "title": "Targeted Final Revision",
        "lessonUnits": "65",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    },
    {
        "id": "english.y11.l66-69",
        "title": "GCSE Final Exam Preparation",
        "lessonUnits": "66–69",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    },
    {
        "id": "english.y11.l69-72",
        "title": "Final Practice Papers",
        "lessonUnits": "69–72",
        "blockTitle": "Literature and Language Exam Focus",
        "year": 11 as const
    }
],
  },
  maths: {
    label: "Mathematics",
    examBoard: "Edexcel",
    lessonsPerWeek: 2,
    lessons: [
    {
        "id": "maths.y10.l01",
        "title": "Place Value and Inequality Symbols",
        "lessonUnits": "1",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l02",
        "title": "Ordering Integers",
        "lessonUnits": "2",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l03",
        "title": "Decimals and Place Value",
        "lessonUnits": "3",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l04-05",
        "title": "Decimals and Fractions",
        "lessonUnits": "4–5",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l06",
        "title": "Indices and Standard Form",
        "lessonUnits": "6",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l07",
        "title": "Squares, Cubes and Roots",
        "lessonUnits": "7",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l08",
        "title": "Powers of Integers",
        "lessonUnits": "8",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l09",
        "title": "Index Notation for Powers of 10",
        "lessonUnits": "9",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l10",
        "title": "Factors, Multiples and Primes",
        "lessonUnits": "10",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l11-12",
        "title": "Algebraic Notation",
        "lessonUnits": "11–12",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l13",
        "title": "Substitution into Formulae",
        "lessonUnits": "13",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l14",
        "title": "Simplifying Expressions",
        "lessonUnits": "14",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l15",
        "title": "Fractions Operations",
        "lessonUnits": "15",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l16",
        "title": "Comparing Fractions, Decimals, Percentages",
        "lessonUnits": "16",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l17",
        "title": "Ratio Basics",
        "lessonUnits": "17",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l18-19",
        "title": "Ratio Problems",
        "lessonUnits": "18–19",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l20-22",
        "title": "Proportion",
        "lessonUnits": "20–22",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l23-25",
        "title": "Graphs of Proportion",
        "lessonUnits": "23–25",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l26-27",
        "title": "Multiplicative Reasoning",
        "lessonUnits": "26–27",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l28-29",
        "title": "Proportion Word Problems",
        "lessonUnits": "28–29",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l30",
        "title": "Multiplicative Reasoning Applications",
        "lessonUnits": "30",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l31-33",
        "title": "Ratio and Multiplicative Problems",
        "lessonUnits": "31–33",
        "blockTitle": "Number",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l34-35",
        "title": "Algebraic Forms",
        "lessonUnits": "34–35",
        "blockTitle": "Algebra",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l36-38",
        "title": "Simplifying Algebra",
        "lessonUnits": "36–38",
        "blockTitle": "Algebra",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l39-41",
        "title": "Expressions and Formulae Problems",
        "lessonUnits": "39–41",
        "blockTitle": "Algebra",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l42-44",
        "title": "Factorising and Equivalence",
        "lessonUnits": "42–44",
        "blockTitle": "Algebra",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l45-47",
        "title": "Substitution and Formulae",
        "lessonUnits": "45–47",
        "blockTitle": "Algebra",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l48-50",
        "title": "Perpendicular Bisector Construction",
        "lessonUnits": "48–50",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l51-52",
        "title": "Angle Bisector and Perpendiculars",
        "lessonUnits": "51–52",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l53",
        "title": "Loci",
        "lessonUnits": "53",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l54",
        "title": "Bearings",
        "lessonUnits": "54",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l55-56",
        "title": "Properties of Shapes",
        "lessonUnits": "55–56",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l57-59",
        "title": "Angles in Parallel Lines",
        "lessonUnits": "57–59",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l60",
        "title": "Angle Problems",
        "lessonUnits": "60",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l61-63",
        "title": "Perimeter and Area",
        "lessonUnits": "61–63",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l64",
        "title": "Volume",
        "lessonUnits": "64",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l65-66",
        "title": "Interior and Exterior Angles",
        "lessonUnits": "65–66",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l67-69",
        "title": "Circle Properties",
        "lessonUnits": "67–69",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l70-71",
        "title": "Perimeter Area Volume Review",
        "lessonUnits": "70–71",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l72",
        "title": "Composite Measures",
        "lessonUnits": "72",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l73-74",
        "title": "Plans and Elevations",
        "lessonUnits": "73–74",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l75-76",
        "title": "Properties of 3D Shapes",
        "lessonUnits": "75–76",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l77-79",
        "title": "Transformations Basics",
        "lessonUnits": "77–79",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l80-81",
        "title": "Enlargement",
        "lessonUnits": "80–81",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l82-84",
        "title": "Combined Transformations",
        "lessonUnits": "82–84",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l85",
        "title": "Cylinders",
        "lessonUnits": "85",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l86",
        "title": "Cones",
        "lessonUnits": "86",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l87",
        "title": "Spheres",
        "lessonUnits": "87",
        "blockTitle": "Graphs, Geometry, Shapes and Functions",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l88-89",
        "title": "Linear Equations",
        "lessonUnits": "88–89",
        "blockTitle": "Equations and Inequalities",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l90-92",
        "title": "Inequalities",
        "lessonUnits": "90–92",
        "blockTitle": "Equations and Inequalities",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l93",
        "title": "Simultaneous Equations",
        "lessonUnits": "93",
        "blockTitle": "Equations and Inequalities",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l100-101",
        "title": "Pythagoras Theorem",
        "lessonUnits": "100–101",
        "blockTitle": "Pythagoras Theorem and Trigonometry",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l102",
        "title": "Trigonometry in Right Triangles",
        "lessonUnits": "102",
        "blockTitle": "Pythagoras Theorem and Trigonometry",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l103",
        "title": "Types of Data and Sampling",
        "lessonUnits": "103",
        "blockTitle": "Statistics",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l104",
        "title": "Averages - Mean, Median, Mode",
        "lessonUnits": "104",
        "blockTitle": "Statistics",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l105",
        "title": "Range",
        "lessonUnits": "105",
        "blockTitle": "Statistics",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l106",
        "title": "Comparing Averages",
        "lessonUnits": "106",
        "blockTitle": "Statistics",
        "year": 10 as const
    },
    {
        "id": "maths.y10.l107-108",
        "title": "Graphical Representations",
        "lessonUnits": "107–108",
        "blockTitle": "Statistics",
        "year": 10 as const
    },
    {
        "id": "maths.y11.l01",
        "title": "Translations",
        "lessonUnits": "1",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l02",
        "title": "Reflections",
        "lessonUnits": "2",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l03-04",
        "title": "Rotations",
        "lessonUnits": "3–4",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l05",
        "title": "Enlargement",
        "lessonUnits": "5",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l06-07",
        "title": "Combined Transformations",
        "lessonUnits": "6–7",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l08-09",
        "title": "Constructions and Loci",
        "lessonUnits": "8–9",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l10",
        "title": "Loci Problems",
        "lessonUnits": "10",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l11-14",
        "title": "Bearings",
        "lessonUnits": "11–14",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l15",
        "title": "Congruence Introduction",
        "lessonUnits": "15",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l16-17",
        "title": "Similarity",
        "lessonUnits": "16–17",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l18",
        "title": "Geometric Proofs",
        "lessonUnits": "18",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l19-21",
        "title": "Vectors",
        "lessonUnits": "19–21",
        "blockTitle": "Geometry",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l22",
        "title": "Probability Language",
        "lessonUnits": "22",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l23",
        "title": "Probability of Single Events",
        "lessonUnits": "23",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l24",
        "title": "Probability Notation",
        "lessonUnits": "24",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l25",
        "title": "Combined Events",
        "lessonUnits": "25",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l26",
        "title": "Tree Diagrams",
        "lessonUnits": "26",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l27",
        "title": "Venn Diagrams",
        "lessonUnits": "27",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l29-30",
        "title": "Plans and Elevations",
        "lessonUnits": "29–30",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l31",
        "title": "Angle Facts",
        "lessonUnits": "31",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l32",
        "title": "Parallel Lines Angles",
        "lessonUnits": "32",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l33",
        "title": "Shape Properties",
        "lessonUnits": "33",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l34",
        "title": "Data Handling",
        "lessonUnits": "34",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l35",
        "title": "Statistical Analysis",
        "lessonUnits": "35",
        "blockTitle": "Statistics and Probability",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l36",
        "title": "Rearranging Equations",
        "lessonUnits": "36",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l37-38",
        "title": "Cubic and Reciprocal Graphs",
        "lessonUnits": "37–38",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l39",
        "title": "Simultaneous Equations Graphically",
        "lessonUnits": "39",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l40-41",
        "title": "Simultaneous Equations Algebraically",
        "lessonUnits": "40–41",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l42-43",
        "title": "Expanding Quadratics",
        "lessonUnits": "42–43",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l44-45",
        "title": "Factorising Quadratics",
        "lessonUnits": "44–45",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l46-47",
        "title": "Quadratic Graphs",
        "lessonUnits": "46–47",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l48-49",
        "title": "Quadratic Problems",
        "lessonUnits": "48–49",
        "blockTitle": "Graphs and Algebra",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l50-51",
        "title": "Fractions and Reciprocals",
        "lessonUnits": "50–51",
        "blockTitle": "Revision Course",
        "year": 11 as const
    },
    {
        "id": "maths.y11.l52-72",
        "title": "GCSE Exam Preparation",
        "lessonUnits": "52–72",
        "blockTitle": "Revision Course",
        "year": 11 as const
    }
],
  },
};

/** @deprecated Use CURRICULUM */
export const PILOT_LESSONS = CURRICULUM;

export const LEARNING_JOURNEY = {
  english: {
    year10: [
      "Descriptive writing & Paper 1 skills",
      "An Inspector Calls",
      "Macbeth",
      "Power and Conflict poetry",
      "Unseen poetry",
    ],
    year11: [
      "A Christmas Carol",
      "Creative reading & writing (Paper 1)",
      "Paper 2 skills",
      "Revision & consolidation",
    ],
  },
  maths: {
    year10: [
      "Number (place value, fractions, ratio)",
      "Algebra",
      "Geometry & measures",
      "Statistics",
    ],
    year11: [
      "Geometry & vectors",
      "Statistics & probability",
      "Graphs & algebra",
      "Revision course",
    ],
  },
};
