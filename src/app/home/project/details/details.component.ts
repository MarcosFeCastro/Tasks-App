import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Project } from 'src/app/models/project';

import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  private projectId: string
  //private subscription: Subscription

  private project: Project = null

  private segment: boolean = true
  private isLoading: boolean = false

  private system_msg: string = null
  
  constructor( public actionSheetController: ActionSheetController, public alertController: AlertController, private projectService: ProjectService, private route: ActivatedRoute, private router: Router ) { }

  setSegment( segment: boolean ) { this.segment = segment }

  goToPage( page: string ) { this.router.navigate( [`${page}`], { replaceUrl: true } ) }

  showDetails( id ) {
    let task = document.getElementById(id)
    if( task.style.maxHeight == "" || task.style.maxHeight == "0px" ) {
      task.style.maxHeight = '200px';
    } else {
      task.style.maxHeight = '0px';
    }
  }

  openConfigs() {
    console.log("Configs!");
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções', cssClass: 'present-action-sheet',
      buttons: [ 
        { text: 'Nova tarefa', role: 'destructive', icon: 'add',
          handler: () => {
            console.log('Delete clicked ' + this.projectId );
          }
        },
        { text: 'Convidar usuário', role: 'destructive', icon: 'person-add', handler: () => { this.router.navigate( [ 'project/', this.projectId, 'invite' ] ) } },
        { text: 'Editar', role: 'destructive', icon: 'reload',
          handler: () => {
            this.router.navigate( ['project/update/', this.projectId ], { replaceUrl: true } )
          }
        },
        { text: 'Deletar', role: 'destructive', icon: 'trash', handler: () => { this.presentDeleteAlert() } },
        { text: 'Cancelar', icon: 'close', role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        } 
      ]
    });
    await actionSheet.present();
  }

  showMenu() {
    let task = document.getElementById('fab-menu')
    let overlay = document.getElementById('overlay2')
    let icon = document.getElementById('menu-icon')
    if( task.style.maxHeight == '' || task.style.maxHeight == '0px' ) {
      //task.style.opacity = '1';
      task.style.maxHeight = '420px';
      //overlay.style.display = "block";
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      icon.setAttribute('name', 'close-outline');
    } else {
      task.style.maxHeight = '0px';
      //overlay.style.display = "none";
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
      icon.setAttribute('name', 'add');
    }
  }

  closeMenu() {
    document.getElementById('fab-menu').style.maxHeight = '0px';
    //document.getElementById("overlay").style.display = "none";
    document.getElementById('overlay2').style.visibility = 'hidden';
    document.getElementById('overlay2').style.opacity = '0';
    document.getElementById('menu-icon').setAttribute('name', 'add');
  }

  presentDeleteAlert() {
    this.closeMenu()
    let del = document.getElementById('delete-alert')
    let overlay = document.getElementById('overlay')
    if( del.style.visibility == '' || del.style.visibility == 'hidden' ) {
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      del.style.visibility = 'visible';
      del.style.opacity = '1';
    } else {
      del.style.visibility = 'hidden';
      del.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
    }
  }

  presentStatusAlert() {
    this.closeMenu()
    let status = document.getElementById('status-alert')
    let overlay = document.getElementById('overlay')
    if( status.style.visibility == '' || status.style.visibility == 'hidden' ) {
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      status.style.visibility = 'visible';
      status.style.opacity = '1';
    } else {
      status.style.visibility = 'hidden';
      status.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
    }
  }

  deleteProject( id ) {
    this.projectService.delete( id ).subscribe( response => {
      this.presentDeleteAlert()
      if( response.status == 200 ) {
        this.router.ngOnDestroy()
        this.router.navigate( ['project'], { replaceUrl: true } )
      }
    }, error => {
      console.error( error )
    } )
  }

  presentExitAlert() {
    this.closeMenu()
    let exit = document.getElementById('exit-alert')
    let overlay = document.getElementById('overlay')
    if( exit.style.visibility == '' || exit.style.visibility == 'hidden' ) {
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      exit.style.visibility = 'visible';
      exit.style.opacity = '1';
    } else {
      exit.style.visibility = 'hidden';
      exit.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
    }
  }

  closeAlerts() {
    let exit = document.getElementById('exit-alert')
    let del = document.getElementById('delete-alert')
    let status = document.getElementById('status-alert')
    let overlay = document.getElementById('overlay')
    exit.style.visibility = 'hidden';
    exit.style.opacity = '0';
    del.style.visibility = 'hidden';
    del.style.opacity = '0';
    status.style.visibility = 'hidden';
    status.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
  }

  exitProject( id ) {

    console.log( "Saindo! " + id )
    
    /**
      this.projectService.exit( id ).subscribe( response => {
        this.presentExitAlert()
        if( response.status == 200 ) {
          this.goToPage( '/project' )
        }
      }, error => {
        console.error( error )
      } )
    */
  }

  setStatus( status: string ) {
    console.log( "Show menu status" );
    let statusData = { id: this.projectId, status: status }
    this.projectService.updateStatus( statusData ).subscribe( response => {
      console.log( response )
      if( response ) {
        this.closeMenu()
        this.project.status = status
      }
      this.closeAlerts()
    }, error => {
      console.error( error )
    } )
  }

  loadProject() {
    this.closeMenu()
    this.isLoading = true
    this.projectService.findDetailsById( this.projectId ).subscribe( result => {
      this.isLoading = false
      console.log( result['result'] )
      if( result['response'] == "Ok" ) {
        this.project = result['result']
      } else {
        this.system_msg = "Projeto não foi encontrado"
      }
    }, error =>{ console.error( error )
      this.isLoading = false
      this.router.navigate( ['/project'], { replaceUrl: true } )
    } )
  }

  openProfile( id ) {

    if( this.project.user_type == 1 ) {
      this.goToPage( '/project/' + this.projectId + '/profile/visit/' + id )
    } else {
      //this.goToPage( '/project/' + this.projectId + '/profile/visit/' + id )
      this.router.navigate( [ '/project/' + this.projectId + '/profile/visit/' + id ], { replaceUrl: true, queryParams: { user_type: 1 } } )
    }

  }

  ngOnInit() {
    //this.subscription = this.route.params.subscribe( ( params: any ) => { this.projectId = params['id'] } )
    this.route.params.subscribe( ( params: any ) => { this.projectId = params['projectid'] } )
    this.loadProject()
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe()
  }

}
