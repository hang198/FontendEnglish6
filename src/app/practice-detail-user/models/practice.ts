import { PracticeConfig } from './practice-config';
import { Question } from './question';

export class Practice {
    id: number;
    name: string;
    description: string;
    config: PracticeConfig;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.config = new PracticeConfig(data.config);
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
