import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-dashboard',
  imports: [ArticleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  articles = [
    {
      title: `Campus Squirrel Elected Student Body President in Landslide Victory`,
      body: `In a shocking turn of events, Nutters the Squirrel has been elected as the new Student Body President after an aggressive campaign involving free acorns and spontaneous tree-climbing performances. Opposing candidates are still recovering from the embarrassment, while Nutters’ approval rating soars. His first order of business? “More trees, less tuition.”`,
    },
    {
      title: `Cafeteria Introduces ‘Mystery Meat Monday,’ Students Bravely Taste the Unknown`,
      body: `The dining hall has launched “Mystery Meat Monday,” a culinary adventure for the brave-hearted. No one knows what the meat is—faculty included. Sophomore Jess R. reported, “It tasted like chicken, beef, and existential dread all at once.” Campus doctors are on standby with Pepto and emotional support plushies.`,
    },
    {
      title: `Student Accidentally Declares War on Canada After Misclick in International Relations Simulation`,
      body: `While playing a diplomacy simulation for class, junior Zach K. meant to send a trade proposal to Canada but accidentally triggered a "military incursion." The Canadian embassy has since responded with a strongly worded email and a maple syrup gift basket. Zach has been banned from simulations and now majors in Art History.`,
    },
    {
      title: `Philosophy Department Still Debating If Final Exam Truly Exists`,
      body: `With finals week approaching, the Philosophy Department remains undecided on whether the final exam is a tangible reality or a construct of the academic-industrial complex. “If a test falls in the woods and no one studies for it, does it still fail you?” pondered Professor Zelton as students slowly backed out of the room.`,
    },
    {
      title: `Local Student Discovers Secret 13th Floor in Library—Finds Ancient Copy of Freshman Year Without Regret`,
      body: `Reports have surfaced of a hidden 13th floor in the library only accessible during full moons and high stress. Senior Linda A. claims she found a dusty scroll titled "How to Avoid Freshman Mistakes". She attempted to take it, but the floor disappeared. “Honestly, I still would’ve dated that guy,” she admitted.`,
    },
  ];
}
