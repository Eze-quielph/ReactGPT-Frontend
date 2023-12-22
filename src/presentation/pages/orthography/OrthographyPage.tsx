import {
  GptMessage,
  MyMessage,
  TextMessagesBox,
  TypingLoader,
} from "../../components";

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, proporcioname el texto y te ayudo con la ortografia..." />
          <MyMessage text="" />
          <div className="fade-in">
            <TypingLoader className="fade-in" />
          </div>
        </div>
      </div>
      <TextMessagesBox
        onSendMessages={(message) => console.log(message)}
        placeholder="Escribe tu texto aquí"
        disableCorrections={true}
      />
    </div>
  );
};
