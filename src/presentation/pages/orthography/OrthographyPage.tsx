import { useState } from "react";
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessagesBox,
  TypingLoader,
} from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setmessages] = useState<Message[]>([]);

  const handlePost = async (message: string) => {
    setIsLoading(true);
    setmessages([...messages, { text: message, isGpt: false }]);

    const data = await orthographyUseCase(message);

    if (!data.ok) {
      setmessages([
        ...messages,
        { text: "No se pudo analizar el texto", isGpt: true },
      ]);
    } else {
      setmessages([
        ...messages,
        {
          text: data.message,
          isGpt: true,
          info: {
            userScore: data.userScore,
            errors: data.errors,
            message: data.message,
          },
        },
      ]);
    }

    setIsLoading(false);

    // todo: Add response
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, proporcioname el texto y te ayudo con la ortografia..." />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage
                key={index}
                errors={message.info!.errors}
                message={message.info!.message}
                userScore={message.info!.userScore}
              />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}
          <MyMessage text="" />
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>
      {/*       <TextMessagesBoxSelect
        onSendMessages={() => console.log()}
        options={[
          { id: "1", text: "hello" },
          { id: "2", text: "world" },
          { id: "3", text: "bye" },
        ]}
      /> */}
      {/*   <TextMessagesBoxFile
        onSendMessages={handlePost}
        placeholder="Escribe tu texto aquí"
      /> */}
      <TextMessagesBox
        onSendMessages={handlePost}
        placeholder="Escribe tu texto aquí"
        disableCorrections
      />
    </div>
  );
};
