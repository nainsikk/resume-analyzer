
# AI/ML Module - Resume Analyzer

## Overview

The AI/ML module analyzes a candidate's resume against a job description and evaluates how well the candidate's profile matches the job requirements.

It extracts skills, compares required and available skills, calculates semantic similarity, evaluates work experience, and generates a final match score with improvement suggestions.

## Features

- Automatic skill extraction from resume and job description text.
- Case-insensitive skill matching.
- Identification of matched and missing skills.
- Semantic similarity using Sentence Transformers.
- Experience extraction and evaluation.
- Weighted final match score.
- Personalized suggestions for resume improvement.
- Input validation for empty, missing, and invalid text.
- Automated tests and evaluation cases.

## Technology Stack

| Technology | Purpose |
|---|---|
| Python | AI/ML implementation |
| Regular Expressions | Skill and experience extraction |
| Sentence Transformers | Semantic similarity |
| all-MiniLM-L6-v2 | Text embedding model |
| Pytest | Automated testing |

## Module Structure

```text
AI/
|-- skill_extractor.py
|-- job_matcher.py
|-- semantic_matcher.py
|-- resume_analyzer.py
|-- test_resume_analyzer.py
|-- evaluate_model.py
|-- README.md
```

## How the AI/ML Module Works

The analysis follows these steps:

1. **Input Validation:** Checks whether the resume and job description are valid, non-empty strings.
2. **Skill Extraction:** Identifies recognized skills from both texts.
3. **Skill Matching:** Compares the extracted skills and identifies matched and missing skills.
4. **Semantic Similarity:** Uses Sentence Transformers to calculate the semantic similarity between the resume and job description.
5. **Experience Evaluation:** Extracts the stated years of experience and compares them with the job requirement.
6. **Final Score Calculation:** Combines the available component scores using weighted scoring.
7. **Suggestions:** Generates suggestions based on missing skills and experience gaps.

## Scoring System

The final score uses the following weights:

| Component | Weight |
|---|---:|
| Skill Match Score | 60% |
| Semantic Similarity | 30% |
| Experience Score | 10% |

The final score is calculated using the available component scores and their corresponding weights.

If a component is unavailable, the remaining available weights are normalized.

All component scores are bounded between 0 and 100 before calculating the final score.

## Individual Components

### 1. Skill Extractor

File: `skill_extractor.py`

Responsibilities:

- Maintains a predefined vocabulary of technical and professional skills.
- Extracts recognized skills using regular expressions.
- Handles case-insensitive skill detection.
- Extracts explicitly stated years of experience.
- Avoids returning overlapping shorter skill phrases when a longer phrase is matched.

### 2. Job Matcher

File: `job_matcher.py`

Responsibilities:

- Compares resume skills with job-required skills.
- Identifies matched skills.
- Identifies missing skills.
- Calculates the skill match percentage.

The skill match score is based on:

```text
Matched Job Skills
------------------- x 100
Total Recognized Job Skills
```

If no recognized job skills are found, the skill match score is unavailable.

### 3. Semantic Matcher

File: `semantic_matcher.py`

Responsibilities:

- Loads the Sentence Transformer model when needed.
- Converts resume and job description text into embeddings.
- Calculates cosine similarity between the embeddings.
- Returns semantic similarity as a percentage.

Model: `all-MiniLM-L6-v2`

Semantic similarity measures textual meaning and similarity. It is not a probability of hiring or a guarantee of job suitability.

### 4. Resume Analyzer

File: `resume_analyzer.py`

This is the main AI/ML module that combines all the components.

Main functions:

- `calculate_experience_score()`
- `calculate_final_score()`
- `analyze_resume()`

The `analyze_resume()` function returns:

- Final match score
- Skill match score
- Semantic similarity
- Experience score
- Resume experience
- Required experience
- Matched skills
- Missing skills
- Improvement suggestions

## Running the AI/ML Module

Activate the project's virtual environment first.

From the project root directory, run:

```powershell
python -m AI.resume_analyzer
```

This runs the sample resume analysis.

## Testing

The AI/ML module includes automated tests using Pytest.

Run the tests from the project root directory:

```powershell
python -m pytest AI/test_resume_analyzer.py -q
```

The latest recorded test result during development was:

```text
73 passed
```

## Model Evaluation

The evaluation script contains 18 manually designed evaluation cases covering:

- Strong match
- Partial match
- Poor match
- Experience gap
- Missing experience information
- Skill matching edge cases
- Invalid and missing inputs
- Fractional experience requirements

Run the evaluation using:

```powershell
python AI/evaluate_model.py
```

The evaluation script generates an `evaluation_report.txt` file.

The latest recorded evaluation result during development was:

| Category | Passed | Failed |
|---|---:|---:|
| Matching Quality | 6 | 0 |
| Experience Evaluation | 4 | 0 |
| Input Validation | 8 | 0 |
| **Total** | **18** | **0** |

These are manually designed smoke tests, not a validated real-world benchmark. Their results should not be interpreted as real-world matching accuracy.

## Limitations

- Skill extraction uses a predefined skill vocabulary.
- Synonyms and differently phrased skills may not always be recognized.
- Experience extraction depends on explicitly stated experience formats.
- Semantic similarity does not independently determine candidate suitability.
- The evaluation cases are manually designed and do not establish performance on real-world resumes.

## Future Improvements

- Expand the skill vocabulary.
- Improve synonym and context-based skill recognition.
- Support more experience formats.
- Evaluate the system using a larger, representative resume dataset.
- Improve recommendation quality.
- Explore more advanced NLP models.

## Conclusion

The AI/ML module provides skill extraction, skill matching, semantic similarity, experience evaluation, weighted scoring, and improvement suggestions as part of the AI-Powered Resume Analyzer project.
