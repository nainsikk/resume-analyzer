
import re

# Technical skills our AI can recognize
SKILL_LIST = [
    # Programming languages
    "Python", "Java", "JavaScript", "C", "C++", "C#", "Go", "PHP",

    # Web development
    "HTML", "CSS", "React", "Node.js", "Node", "FastAPI", "Django",
    "Flask", "REST API", "GraphQL",

    # Databases
    "SQL", "PostgreSQL", "Postgres", "MySQL", "MongoDB",

    # Artificial Intelligence and Machine Learning
    "Machine Learning", "Deep Learning", "Natural Language Processing",
    "NLP", "Artificial Intelligence", "Generative AI", "Scikit-learn",
    "TensorFlow", "PyTorch",

    # Data Science
    "Data Analysis", "Data Science", "Pandas", "NumPy", "Apache Spark",
    "Excel", "Power BI", "Tableau",

    # Cloud and DevOps
    "AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes",
    "Linux",

    # Development tools
    "Git", "GitHub",

    # Professional skills
    "Communication", "Communication Skills", "Project Management",
    "Problem Solving", "Leadership", "Teamwork",
]


def extract_skills(text):
    """
    Extract recognized skills from resume or job description text.
    Avoid returning shorter skills that are already part of
    a longer recognized skill phrase.
    """
    if not isinstance(text, str):
        return []

    found_skills = []
    matched_spans = []

    sorted_skills = sorted(SKILL_LIST, key=len, reverse=True)

    for skill in sorted_skills:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        for match in re.finditer(pattern, text, re.IGNORECASE):
            start, end = match.span()

            overlaps = any(
                start < existing_end and end > existing_start
                for existing_start, existing_end in matched_spans
            )

            if not overlaps:
                found_skills.append(skill)
                matched_spans.append((start, end))
                break

    return found_skills


def extract_experience(text):
    """
    Extract explicitly stated experience duration.

    Converts months into decimal years.
    Examples:
        6 months -> 0.5
        12 months -> 1.0
        1 year and 6 months -> 1.5

    Returns:
        Number of years, or None if no experience is found.
    """
    if not isinstance(text, str):
        return None

    matches = []

    # Extract year-based experience.
    year_patterns = [
        r"(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?)\s*(?:(?:of\s+)?(?:relevant\s+)?|working\s+)?experience",
        r"(?:worked|working)\s+for\s+(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?)",
    ]

    for pattern in year_patterns:
        matches.extend(
            float(value)
            for value in re.findall(pattern, text, re.IGNORECASE)
        )

    # Extract combined durations such as 1 year and 6 months.
    combined_pattern = (
        r"(\d+(?:\.\d+)?)\s*years?\s*(?:and\s+)?"
        r"(\d+(?:\.\d+)?)\s*months?"
    )

    for match in re.finditer(combined_pattern, text, re.IGNORECASE):
        years = float(match.group(1))
        months = float(match.group(2))
        matches.append(years + months / 12)

    # Extract standalone month durations.
    month_pattern = (
        r"(\d+(?:\.\d+)?)\s*months?\s*(?:of\s+)?experience"
    )

    for match in re.finditer(month_pattern, text, re.IGNORECASE):
        matches.append(float(match.group(1)) / 12)

    if not matches:
        return None

    return max(matches)


# Test the extractor
if __name__ == "__main__":

    sample_resume = """
    I am a software developer with 3 years of experience
    in Python, JavaScript, React, SQL and Docker.

    I have worked on several software development projects.
    """

    skills = extract_skills(sample_resume)
    experience = extract_experience(sample_resume)

    print("Sample resume:")
    print(sample_resume)
    print("\nSkills detected:")
    print(skills)
    print("\nTotal skills found:", len(skills))
    print("\nExperience detected:", experience, "years")
