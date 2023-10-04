import { useState, useEffect } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function PixelHome(){
    const[erro , setErro] = useState('')
    const[listartipos, setListarTipos] = useState([])
    const[listar, setListar] = useState([])

    const[marca , setMarca] = useState('')
    const[nome , setNome] = useState('')
    const[estoque , setEstoque] = useState('')
    const[preco , setPreco] = useState('')
    const[garantia , setGarantia] = useState('')
    const[categoria , setCategoria] = useState('')
    const[id, setId] = useState(0)


    async function limpar(){
        setCategoria(0)
        setMarca('')
        setNome('')
        setEstoque('')
        setPreco('')
        setGarantia('')
        setId(0)
      }

    async function ListarCategorias(){
        let r = await axios.get('http://localhost:5000/listar/categoria')
        setListarTipos(r.data)
    }

    async function Listar(){
        let r = await axios.get('http://localhost:5000/listar')
        setListar(r.data)
    }

    

    useEffect(() => {
        ListarCategorias()
    }, [])

    async function Alterar(item){
        setCategoria(item.id_categoria)
        setMarca(item.nm_marca)
        setNome(item.nm_produto)
        setEstoque(item.ds_estoque)
        setPreco(item.nr_preco)
        setGarantia(item.nr_garantia)
        setId(item.id_produto)
    }

    async function Salvar(){
            try{
                let produto = {
                    categoria: categoria,
                    marca: marca,
                    nome: nome,
                    preco: preco,
                    estoque: estoque,
                    garantia: garantia
                }
    
                if(id == 0){
                    let r = await axios.post('http://localhost:5000/produto', produto)
                    setErro('Produto adicionado')
                }
    
                else{
                    let r = await axios.put('http://localhost:5000/alterar/' + id, produto);
                    setErro('Produto alterado')
                }
    
                limpar()
                Listar()
    }
    catch(err){
      setErro(err.response.data.erro)
    }
  }


  async function Deletar(id){
    confirmAlert({
      title: 'PRODUTOS',
      message: 'Tem certeza que deseja remover?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            let r = await axios.delete('http://localhost:5000/deletar/' + id);
            alert('Veículo foi removido com sucesso');
            Listar()
          }
        },
        {
          label: 'Não'
        }
      ]
    });
    
  } 



    return(
        <div className='pagina-pixelhome'>
            <header className='pixelhome-cabe'>
                <section className='cabe-start'>
                    <img src='/assets/images/image 5.svg'/>
                    <h1><span>PIXEL</span>WORLD</h1>
                </section>

                <section className='cabe-meio'>
                    <p>Produtos</p>
                    <p>Categorias</p>
                    <p>Dúvidas</p>

                    <div className='cabe-meio-input'>
                        <input placeholder='' />
                        <img src='/assets/images/lupa.svg'/>
                    </div>
                </section>

                <section className='cabe-end'>
                    <Link>Login</Link>
                </section>
            </header>

            <section className='pixelhome-s1'>
                <div className='s1-textos'>
                    <h1><span>PIXELWORLD</span> O PORTAL PARA O MUNDO DOS GAMES</h1>
                    <p>Explorando o mundo dos consoles onde os sonhos se tornam realidade.</p>
                
                    <Link>Explorar Mais</Link>
                </div>

                <div className='s1-img'>
                    <img src='/assets/images/imageS1.svg'/>
                </div>
            </section>

            <section className='pixelhome-s2'>
                <h1>CADASTRAR NOVO PRODUTO</h1>

                <div className='s2-cadastro'>
                    <section className='s2-inputs'>
                        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                            <option>CATEGORIAS</option>
                            {listartipos.map(item =>
                                <option value={item.id_categoria}>{item.nm_categoria}</option>
                            )}
                        </select>

                        <input placeholder='MARCA' value={marca} onChange={e => setMarca(e.target.value)}/>
                        <input placeholder='NOME DO PRODUTO' value={nome} onChange={e => setNome(e.target.value)}/>
                    </section>

                    <section className='s2-linha'></section>

                    <section className='s2-inputs'>
                        <input placeholder='ESTOQUE' value={estoque} onChange={e => setEstoque(e.target.value)}/>
                        <input placeholder='PREÇO' value={preco} onChange={e => setPreco(e.target.value)}/>
                        <input placeholder='GARANTIA' value={garantia} onChange={e => setGarantia(e.target.value)}/>
                    </section>

                </div>

                <button onClick={Salvar}>
                  {id == 0 ? 'Salvar' : 'Alterar'}
              </button>

                <p>{erro}</p>
            </section>

            <section className='pixelhome-s3'>
                <h1>Produtos</h1>

                <div className='card-s3'>
                    <div className='card-p1'>
                        <section className='card-input'>
                            <input placeholder='Buscar produto'/>
                            <img onClick={Listar} src='/assets/images/Vector.svg'/>
                        </section>

                        <section className='card-filtro'>
                            <img src='/assets/images/filtro.svg'/>
                            <p>Filtro</p>
                        </section>
                    </div>

                    <div className='card-p2'>
                        <section className='card-categoria'>
                            <img src='/assets/images/categoria.svg'/>
                            
                            <p>Categorias</p>
                        </section>

                        <section className='card-maisproduto'>
                            <img src='/assets/images/mais.svg'/>
                            <h6>PRODUTO</h6>
                        </section>
                    </div>
                </div>

                <section className='s3-titulos'>
                    <p>Categoria</p>
                    <p>Marca</p>
                    <p>Nome</p>
                    <p>Estoque</p>
                    <p>Preço</p>
                    <p>Garantia</p>
                </section>
                <div className='s3-linha'></div>

                {listar.map(item =>
                    <section className='s3-tabela'>
                        <div className='tabela'>
                            <p>{item.nm_categoria}</p>
                            <p>{item.nm_marca}</p>
                            <p>{item.nm_produto}</p>
                            <p>{item.ds_estoque}</p>
                            <p>{item.nr_preco}</p>
                            <p>{item.nr_garantia}</p>

                            <img src='/assets/images/alterar.svg' onClick={() => Alterar(item)}/>
                            <img src='/assets/images/deletar.svg' onClick={() => Deletar(item.id_produto)}/>
                        </div>
                        <section className='linha-tabela'></section>
                    </section>
                )}
            </section>
        </div>
    )
}