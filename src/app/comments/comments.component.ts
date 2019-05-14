import { Component, OnInit } from '@angular/core';
import { comments } from '../core/comments.data';
import { Comments } from '../core/models/comments/comments';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, filter } from 'rxjs/operators';
import { User } from '../core/models/user/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  user: User;
  commentsCollection: AngularFirestoreCollection<Comments>;
  comments: Comments;
  imageTip: string;
  typingComments = '';

  constructor(private activeRoute: ActivatedRoute, private db: AngularFirestore) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      if (!!localStorage.getItem('user')) {
        this.user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
      }

      this.commentsCollection = this.db.collection<Comments>('comments');
      this.commentsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Comments;
            const id = a.payload.doc['id'];
            return { id, ...data };
          });
        })).subscribe((response: Comments[]) => {
          this.comments = (!!response) ? response.find(x => x.name === params['name']) : undefined;
          this.comments.feedbacks = this.comments.feedbacks.filter(n => n);
        });
    });
  }

  insertComment(): void {
    this.comments.feedbacks.push({
      name: this.user.name,
      text: this.typingComments,
      email: this.user.email,
      image: this.user.image,
      date: new Date().toLocaleString().toString()
    });

    this.db.collection('comments').doc(this.comments.id).set({
      feedbacks: this.comments.feedbacks
    }, { merge: true });
    this.typingComments = '';
  }
}
