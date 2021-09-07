import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas() //Ao iniciar a pagina Temas irá listar todos os temas automaticamente
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }
  
  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
      this.findAllTemas() // Após cadastrar um Tema irá listar na pagina os Temas
      this.tema = new Tema() // cria um novo objeto tema zerado
    })
  }

}
