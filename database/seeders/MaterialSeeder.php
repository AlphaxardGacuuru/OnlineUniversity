<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $unit1 = Unit::where("year", 1)
            ->where("semester", 1)
            ->orderBy("id", "DESC")
            ->first();

        $unit2 = Unit::where("year", 1)
            ->where("semester", 2)
            ->orderBy("id", "DESC")
            ->first();

        $unit3 = Unit::where("year", 1)
            ->where("semester", 3)
            ->orderBy("id", "DESC")
            ->first();

        $units = collect([$unit1, $unit2, $unit3]);

        $titles = [
            "Learning Guide",
            "Discussion Forum",
            "Written Assignment",
            "Learning Reflection",
            "Self Quiz",
            "CAT 1",
            "CAT 2",
            "Review Quiz",
            "Final Exam",
        ];

        $richText = [
            "Learning Guide" => "<h1>Learning Guide: KASNEB 1012 Paper No.2 Introduction to Computing Systems</h1><h2>Introduction to the Course</h2><p>This Course unit covers the competencies required to demonstrate foundational concepts of computers, operate computer hardware, identify computer software, perform data representation, identify computer networks, use the Internet and apply computer security.</p><h3>KASNEB Syllabus Topics</h3><p>Summary of Learning Outcomes</p><ol><li>Wk 1-Demonstrate foundational concepts of computers</li><li>Wk 2-Operate computer hardware</li><li>Wk 3-Identify Computer Software-Part 1</li><li>Wk 4- Identify Computer Software-Part 2</li><li>Wk 5-Perform Data representation</li><li>Wk 6-Identify computer networks</li><li>Wk 7-Use the Internet</li><li>Wk 8-Apply Computer Security.</li></ol>",
            "Discussion Forum" => "<h1>Discussion Forum: KASNEB 1012 Paper No.2 Introduction to Computing Systems</h1><h2>Introduction to the Course</h2><p>This Course unit covers the competencies required to demonstrate foundational concepts of computers, operate computer hardware, identify computer software, perform data representation, identify computer networks, use the Internet and apply computer security.</p><h3>KASNEB Syllabus Topics</h3><p>Summary of Learning Outcomes</p><ol><li>Wk 1-Demonstrate foundational concepts of computers</li><li>Wk 2-Operate computer hardware</li><li>Wk 3-Identify Computer Software-Part 1</li><li>Wk 4- Identify Computer Software-Part 2</li><li>Wk 5-Perform Data representation</li><li>Wk 6-Identify computer networks</li><li>Wk 7-Use the Internet</li><li>Wk 8-Apply Computer Security.</li></ol>",
            "Written Assignment" => "<h1>Written Assignment: KASNEB 1012 Paper No.2 Introduction to Computing Systems</h1><h2>Introduction to the Course</h2><p>This Course unit covers the competencies required to demonstrate foundational concepts of computers, operate computer hardware, identify computer software, perform data representation, identify computer networks, use the Internet and apply computer security.</p><h3>KASNEB Syllabus Topics</h3><p>Summary of Learning Outcomes</p><ol><li>Wk 1-Demonstrate foundational concepts of computers</li><li>Wk 2-Operate computer hardware</li><li>Wk 3-Identify Computer Software-Part 1</li><li>Wk 4- Identify Computer Software-Part 2</li><li>Wk 5-Perform Data representation</li><li>Wk 6-Identify computer networks</li><li>Wk 7-Use the Internet</li><li>Wk 8-Apply Computer Security.</li></ol>",
            "Learning Reflection" => "<h1>Learning Reflection: KASNEB 1012 Paper No.2 Introduction to Computing Systems</h1><h2>Introduction to the Course</h2><p>This Course unit covers the competencies required to demonstrate foundational concepts of computers, operate computer hardware, identify computer software, perform data representation, identify computer networks, use the Internet and apply computer security.</p><h3>KASNEB Syllabus Topics</h3><p>Summary of Learning Outcomes</p><ol><li>Wk 1-Demonstrate foundational concepts of computers</li><li>Wk 2-Operate computer hardware</li><li>Wk 3-Identify Computer Software-Part 1</li><li>Wk 4- Identify Computer Software-Part 2</li><li>Wk 5-Perform Data representation</li><li>Wk 6-Identify computer networks</li><li>Wk 7-Use the Internet</li><li>Wk 8-Apply Computer Security.</li></ol>",
        ];

        $questions = [
            "time" => "10",
            "questions" => [
                [
                    "question" => "Question1",
                    "answerA" => "A",
                    "answerB" => "B",
                    "answerC" => "C",
                    "answerD" => "D",
                    "correctAnswer" => "B",
                ],
                [
                    "question" => "Question2",
                    "answerA" => "A",
                    "answerB" => "B",
                    "answerC" => "C",
                    "answerD" => "D",
                    "correctAnswer" => "D",
                ],
                [
                    "question" => "Question3",
                    "answerA" => "A",
                    "answerB" => "B",
                    "answerC" => "C",
                    "answerD" => "D",
                    "correctAnswer" => "C",
                ],
                [
                    "question" => "Question4",
                    "answerA" => "A",
                    "answerB" => "B",
                    "answerC" => "C",
                    "answerD" => "D",
                    "correctAnswer" => "A",
                ],
            ],
        ];

        // Loop through each unit
        foreach ($units as $unit) {

            // Define start and end dates
            switch ($unit->semester) {
                case 1:
                    $start_date = Carbon::parse('2024-01-01');
                    $end_date = Carbon::parse('2024-04-30');
                    break;

                case 2:
                    $start_date = Carbon::parse('2024-05-04');
                    $end_date = Carbon::parse('2024-08-30');
                    break;

                default:
                    $start_date = Carbon::parse('2024-09-04');
                    $end_date = Carbon::parse('2024-12-30');
                    break;
            }

            // Initialize array to store week start and end dates
            $weeks = [];

            // Loop through each week and get start and end dates
            while ($start_date->lte($end_date)) {
                $week_start = $start_date->copy()->startOfWeek();
                $week_end = $start_date->copy()->endOfWeek();

                // Add start and end dates to array
                $weeks[] = [
                    'startDate' => $week_start->format('Y-m-d'),
                    'endDate' => $week_end->format('Y-m-d'),
                ];

                // Move to next week
                $start_date->addWeek();
            }

            // Loop through weeks
            foreach ($weeks as $key => $week) {
				$key++;

                // Loop through titles
                foreach ($titles as $title) {
                    $richTextToUse = collect([
                        "Learning Guide",
                        "Discussion Forum",
                        "Written Assignment",
                        "Learning Reflection",
                    ])->contains($title) ? $richText[$title] : null;

                    $questionsToUse = collect([
                        "Self Quiz",
                        "CAT 1",
                        "CAT 2",
                        "Review Quiz",
                        "Final Exam",
                    ])->contains($title) ? $questions : null;

                    Material::factory()
                        ->create([
                            "title" => $title,
                            "rich_text" => $richTextToUse,
                            "questions" => $questionsToUse,
                            "week" => $key,
                            "unit_id" => $unit->id,
                            "starts_at" => $week["startDate"],
                            "ends_at" => $week["endDate"],
                        ]);
                }
            }
        }
    }
}
