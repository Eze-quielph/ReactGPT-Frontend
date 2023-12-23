import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessages: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const TextMessagesBoxFile = ({
  onSendMessages,
  placeholder = "",
  disableCorrections = false,
  accept,
}: Props) => {
  const [message, setMessage] = useState<string>("");
  const [seletedFile, setSeletedFile] = useState<File | null>(null);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim().length === 0) return;
    onSendMessages(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-papeclip text-xl"></i>
        </button>
        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={(e) => setSeletedFile(e.target.files?.item(0) || null)}
          hidden
        />
      </div>

      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={
              placeholder.length > 0 ? placeholder : "Ingrese su texto"
            }
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button type="submit" className="btn-primary" disabled={!seletedFile}>
          {!seletedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {seletedFile.name.substring(0, 15)}....
            </span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
