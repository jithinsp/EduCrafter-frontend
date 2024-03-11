import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AcademicsService } from 'src/app/core/services/academics/academics.service';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent {

  title: string;
  mode: 'create' | 'edit';
  editId: string;
  subjects: any[];
  classes: any[];
  slots: any[];

  //all subscribtions
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  private subscription4: Subscription;
  private subscription5: Subscription;
  private subscription6: Subscription;


  ngOnDestroy() {
    // Unsubscribe from subscriptions to avoid memory leaks
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
    if (this.subscription4) {
      this.subscription4.unsubscribe();
    }
    if (this.subscription5) {
      this.subscription5.unsubscribe();
    }
    if (this.subscription6) {
      this.subscription6.unsubscribe();
    }
  }

  fetchSubjects() {
    this.subscription1 = this.academicsService.getAllSubjects().subscribe(
      (data) => {
        this.subjects = data;
      }
    );
  }

  fetchClasses() {
    this.subscription2 = this.academicsService.getAllClasses().subscribe(
      (data) => {
        this.classes = data;
      }
    );
  }

  fetchSlots() {
    this.subscription3 = this.academicsService.getAllSlots().subscribe(
      (data) => {
        this.slots = data;
      }
    );
  }

  registerForm: FormGroup;
  constructor(
    // private service: JwtService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    // private router: Router,
    private academicsService: AcademicsService,
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      timeslot: ['', [Validators.required]],
      date: ['', [Validators.required]],
      remark: [''],
    })
    this.route.queryParams.subscribe(params => {
      this.editId = params['id'];
      this.mode = params['mode'];
      if (this.editId) {
        this.academicsService.getExams(this.editId).subscribe(
          (details) => {
            console.log("Details: " + details);
            this.registerForm.patchValue({
              id: details.id,
              subject: details.subject,
              classes: details.classes,
              name: details.name,
              timeslot: details.timeslot,
              date: details.date,
              remark: details.remark,
            });
          }
        );
      }
    });
    this.title = (this.mode === 'edit') ? 'Edit' : 'Create';
  }

  // prepareDataForBackend() {
  //   const formData = this.registerForm.value;
  //   const formattedData = {
  //     name: formData.name,
  //     email: formData.email,
  //     password: formData.password,
  //     sex: formData.sex,
  //     phone: formData.phone,
  //     remarks: formData.remarks,
  //     designation: formData.designation,
  //     studentId: formData.studentId,
  //     dateOfBirth: formData.dateOfBirth
  //   };
  //   const field = 'dateOfBirth';

  //   if (formData[field] instanceof Date) {
  //     const dateOfBirth = new Date(formData[field]);
  //     const isoString = new Date(dateOfBirth.getTime() - (dateOfBirth.getTimezoneOffset() * 60000)).toISOString();
  //     formattedData[field] = isoString;
  //   }
  //   return formattedData;
  // }


  submitForm() {
    if (this.mode === 'edit') {
      console.log(this.registerForm.value);
      this.subscription5 = this.academicsService.editExams(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);
          this.resetForm();
          this.showSuccessMessage('Exam updated successfully');
        },
        (error) => {
          this.showErrorMessage(error);
          console.error(error);
        }
      );
    } else {
      console.log(this.registerForm.value);
      // const dataForBackend = this.prepareDataForBackend();
      this.subscription6 = this.academicsService.createExams(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);
          this.resetForm();
          this.showSuccessMessage('Exam added successfully');
        },
        (error) => {
          this.showErrorMessage(error);
          console.error(error);
        }
      );
    }
  }

  showErrorMessage(error: any) {
    let errorMessage = 'An error occurred';

    if (error && error.error) {
      // Use the specific error message from the server response if available
      errorMessage = error.error;
    } else if (error && error.message) {
      // Use the error message from the error object if available
      errorMessage = error.message;
    }
    this.showSuccessMessage(errorMessage);
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // (in milliseconds)
    });
  }

  resetForm() {
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key).setErrors(null);
    });
    this.registerForm.markAsUntouched();
  }

}