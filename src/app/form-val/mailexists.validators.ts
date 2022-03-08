import { AbstractControl } from "@angular/forms";
import { InscriptionService } from "app/_services/inscription.service";



export class Mailexists {
    constructor(
                private inscriptionService: InscriptionService,
                 ) {}
      forbiddenMailValidator(control : AbstractControl): {[key:string] : any} | null {
        const forbidden = this.inscriptionService.verifyMail(control.value)
            // /admin/.test(control.value)
        return forbidden ? {'forbiddenMail': {value: control.value}}: null;
    }
}