
import sys
import time
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from AI.resume_analyzer import analyze_resume


matching_cases = [
    {
        "name": "Exact Skill Match",
        "resume": "Python developer with 3 years of experience. Skilled in Python, SQL and FastAPI.",
        "job": "Looking for a Python developer with 2 years of experience. Required skills: Python, SQL and FastAPI.",
    },
    {
        "name": "Partial Skill Match",
        "resume": "Python developer with 3 years of experience. Skilled in Python and SQL.",
        "job": "Looking for a developer with 2 years of experience. Required skills: Python, SQL and Docker.",
    },
    {
        "name": "No Skill Match",
        "resume": "Graphic designer with 3 years of experience. Skilled in Photoshop and Illustrator.",
        "job": "Looking for a Python developer with 2 years of experience. Required skills: Python, SQL and FastAPI.",
    },
    {
        "name": "Multiple Missing Skills",
        "resume": (
            "Python developer with 3 years of experience. "
            "Skilled in Python and SQL."
        ),
        "job": (
            "Looking for a developer with 2 years of experience. "
            "Required skills: Python, SQL, Docker and AWS."
        ),
    },
]

experience_cases = [
    {
        "name": "Meets Required Experience",
        "resume": "Python developer with 3 years of experience. Skills: Python, SQL.",
        "job": "Python developer with 3 years of experience. Required skills: Python, SQL.",
    },
    {
        "name": "Less Than Required Experience",
        "resume": "Python developer with 1 year of experience. Skills: Python, SQL.",
        "job": "Python developer with 3 years of experience. Required skills: Python, SQL.",
    },
    {
        "name": "Fractional Experience Requirement",
        "resume": "Python developer with 2 years of experience. Skills: Python, SQL.",
        "job": "Python developer with 1.5 years of experience. Required skills: Python, SQL.",
    },
    {
        "name": "Exceeds Required Experience",
        "resume": (
            "Python developer with 5 years of experience. "
            "Skills: Python, SQL, FastAPI and Docker."
        ),
        "job": (
            "Python developer with 3 years of experience. "
            "Required skills: Python, SQL, FastAPI and Docker."
        ),
    },
    {
        "name": "Six Months of Experience",
        "resume": (
            "Python developer with 6 months of experience. "
            "Skills: Python and SQL."
        ),
        "job": (
            "Python developer with 1 year of experience. "
            "Required skills: Python and SQL."
        ),
    },
]

validation_cases = [
    {
        "name": "Empty Resume",
        "resume": "",
        "job": "Python developer with 2 years of experience.",
    },
    {
        "name": "Empty Job Description",
        "resume": "Python developer with 2 years of experience.",
        "job": "",
    },
    {
        "name": "Both Inputs Empty",
        "resume": "",
        "job": "",
    },
]

evaluation_categories = {
    "Matching Quality": len(matching_cases),
    "Experience Evaluation": len(experience_cases),
    "Input Validation": len(validation_cases),
}


def run_evaluation():
    start_time = time.time()
    passed_cases = 0
    failed_cases = 0
    results = []

    all_cases = (
        [("Matching Quality", case) for case in matching_cases]
        + [("Experience Evaluation", case) for case in experience_cases]
        + [("Input Validation", case) for case in validation_cases]
    )

    print("=" * 60)
    print("AI RESUME ANALYZER - EVALUATION")
    print("=" * 60)

    for category, case in all_cases:
        print(f"\nTesting: {case['name']}")

        try:
            result = analyze_resume(case["resume"], case["job"])

        except ValueError:
            if case["name"] in (
                "Empty Resume",
                "Empty Job Description",
                "Both Inputs Empty",
            ):
                passed_cases += 1
                results.append(
                    {
                        "category": category,
                        "name": case["name"],
                        "status": "PASS",
                        "result": "Correctly rejected empty input",
                    }
                )
                print("Result: PASS - Empty input correctly rejected")
                continue

            failed_cases += 1
            results.append(
                {
                    "category": category,
                    "name": case["name"],
                    "status": "FAIL",
                    "result": "Unexpected ValueError",
                }
            )
            print("Result: FAIL - Unexpected ValueError")
            continue

        except Exception as error:
            failed_cases += 1
            results.append(
                {
                    "category": category,
                    "name": case["name"],
                    "status": "FAIL",
                    "result": str(error),
                }
            )
            print(f"Result: FAIL - {error}")
            continue

        if case["name"] == "Exceeds Required Experience":
            passed = (
                result["resume_experience"] == 5.0
                and result["required_experience"] == 3.0
                and result["experience_score"] == 100
            )

        elif case["name"] == "Multiple Missing Skills":
            passed = (
                "docker" in result["missing_skills"]
                and "aws" in result["missing_skills"]
                and "python" in result["matched_skills"]
                and "sql" in result["matched_skills"]
            )

        elif case["name"] == "Six Months of Experience":
            passed = (
                result["resume_experience"] == 0.5
                and result["required_experience"] == 1.0
            )

        else:
            passed = isinstance(result, dict) and "match_score" in result

        status = "PASS" if passed else "FAIL"

        if passed:
            passed_cases += 1
        else:
            failed_cases += 1

        results.append(
            {
                "category": category,
                "name": case["name"],
                "status": status,
                "result": result,
            }
        )

        print(f"Result: {status}")

        if isinstance(result, dict) and "match_score" in result:
            print(f"Match Score: {result['match_score']}")
            print(f"Matched Skills: {result['matched_skills']}")
            print(f"Missing Skills: {result['missing_skills']}")

    duration = time.time() - start_time
    total_cases = passed_cases + failed_cases
    percentage = (passed_cases / total_cases * 100) if total_cases else 0

    report = [
        "=" * 60,
        "AI RESUME ANALYZER - EVALUATION REPORT",
        "=" * 60,
        f"Total Test Cases: {total_cases}",
        f"Passed: {passed_cases}",
        f"Failed: {failed_cases}",
        f"Pass Percentage: {percentage:.2f}%",
        f"Duration: {duration:.2f} seconds",
        "",
        "CATEGORY SUMMARY",
    ]

    for category, total in evaluation_categories.items():
        category_passed = sum(
            1
            for item in results
            if item["category"] == category and item["status"] == "PASS"
        )
        report.append(f"{category}: {category_passed}/{total}")

    report.extend(["", "DETAILED RESULTS"])

    for item in results:
        report.append(
            f"{item['category']} | {item['name']} | {item['status']}"
        )

    report.extend(
        [
            "",
            f"OVERALL RESULT: {'PASS' if failed_cases == 0 else 'FAIL'}",
        ]
    )

    report_text = "\n".join(report)

    print("\n" + report_text)

    report_path = Path(__file__).resolve().parent / "evaluation_report.txt"
    report_path.write_text(report_text, encoding="utf-8")

    print(f"\nReport saved to: {report_path}")

    return failed_cases


if __name__ == "__main__":
    failed_cases = run_evaluation()
    sys.exit(0 if failed_cases == 0 else 1)
