import { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Cliente from "../../../modelo/Cliente";
import CPF from "../../../modelo/CPF";
import RG from "../../../modelo/RG";
import Telefone from "../../../modelo/Telefone";
import Produto from "../../../modelo/Produto";
import Servico from "../../../modelo/Servico";

type Props = {
    tema: string
}

// Dados mockados
let clientes: Array<Cliente> = [
new Cliente("João da Silva", "Joãozinho", "Masculino", new CPF("123.456.789-00", new Date("2000-01-15"))),
    new Cliente("Maria Oliveira", "Maria", "Feminino", new CPF("987.654.321-00", new Date("1995-05-22"))),
    new Cliente("Carlos Souza", "Carlito", "Masculino", new CPF("111.222.333-44", new Date("1988-10-30"))),
    new Cliente("Ana Pereira", "Aninha", "Feminino", new CPF("555.666.777-88", new Date("1992-03-10"))),
    new Cliente("Lucas Almeida", "Lu", "Masculino", new CPF("999.888.777-66", new Date("2001-07-19"))),
    new Cliente("Juliana Costa", "Juju", "Feminino", new CPF("333.222.111-00", new Date("1990-12-25"))),
    new Cliente("Pedro Rocha", "Pedrinho", "Masculino", new CPF("444.555.666-77", new Date("1985-06-05"))),
    new Cliente("Larissa Mendes", "Lari", "Feminino", new CPF("222.333.444-55", new Date("1998-11-11"))),
    new Cliente("Rafael Lima", "Rafa", "Masculino", new CPF("666.777.888-99", new Date("2003-09-03"))),
    new Cliente("Beatriz Ramos", "Bia", "Feminino", new CPF("777.888.999-00", new Date("1993-04-17")))
];

// Produtos e serviços
const produtos = [
    new Produto("Shampoo", 20),
    new Produto("Pomada", 35),
    new Produto("Gel", 15),
];

const servicos = [
    new Servico("Corte de cabelo", 50),
    new Servico("Barba", 30),
    new Servico("Sobrancelha", 25),
];

// Associando produtos, serviços, RGs e telefones aos clientes
clientes.forEach((cliente, i) => {
    cliente.adicionarProdutoConsumido(produtos[i % produtos.length]);
    cliente.adicionarServicoConsumido(servicos[i % servicos.length]);
    cliente.adicionarRG(`RG000${i}`, new Date(`201${i}-01-01`));
    cliente.adicionarTelefone(`1${i}`, `98765-432${i}`);
});

export default function ListagemTop10Clientes({ tema }: Props) {
    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }, []);

    return (
        <div className="row">
            <div className="col s10 offset-s1">
                <ul className="collapsible">
                    {clientes.map((cliente, index) => (
                        <li key={index}>
                            <div className={`collapsible-header ${tema} white-text`}>
                                <i className="material-icons">account_circle</i>
                                {cliente.nome}
                            </div>
                            <div className="collapsible-body">
                                <div className="section">
                                    <h6 className="blue-text text-darken-2">Informações Pessoais</h6>
                                    <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                                    <p><strong>Gênero:</strong> {cliente.genero}</p>
                                    <p><strong>CPF:</strong> {cliente.getCpf.getValor}</p>
                                    <p><strong>Data de Emissão do CPF:</strong> {cliente.getCpf.getDataEmissao.toLocaleDateString()}</p>
                                </div>

                                <div className="divider"></div>

                                <div className="section">
                                    <h6 className="blue-text text-darken-2">Documentos</h6>
                                    <p><strong>RG(s):</strong></p>
                                    <ul>
                                        {cliente['rgs'].map((rg: RG, idx: number) => (
                                            <li key={idx}>
                                                {rg['valor']} - {rg['dataEmissao'].toLocaleDateString()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="divider"></div>

                                <div className="section">
                                    <h6 className="blue-text text-darken-2">Telefones</h6>
                                    <ul>
                                        {cliente['telefones'].map((tel: Telefone, idx: number) => (
                                            <li key={idx}>
                                                ({tel['ddd']}) {tel['numero']}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="divider"></div>

                                <div className="section">
                                    <h6 className="blue-text text-darken-2">Produtos Consumidos</h6>
                                    <ul>
                                        {cliente['produtosConsumidos'].map((prod: Produto, idx: number) => (
                                            <li key={idx}>
                                                {prod.nome} - R$ {prod.preco.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="divider"></div>

                                <div className="section">
                                    <h6 className="blue-text text-darken-2">Serviços Consumidos</h6>
                                    <ul>
                                        {cliente['servicosConsumidos'].map((serv: Servico, idx: number) => (
                                            <li key={idx}>
                                                {serv.nome} - R$ {serv.preco.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
