import Input from "../../components/Input";
import { Container, Main, Section } from "./styles";

export default function Home() {
  return (
    <Main>
      <Container>
        <Section>
          <form>
            <Input type='text' value={""} />
            <button type='submit' value='Criar tarefa' />
          </form>

          <h3>Tarefas</h3>
          <ul>
            <li>Tarefa 1</li>
          </ul>
        </Section>
      </Container>
    </Main>
  );
}
