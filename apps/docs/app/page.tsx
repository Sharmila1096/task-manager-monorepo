import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>Docs App Ready 📚</h1>

      <div style={{ marginTop: "20px" }}>
        <Button>Shared UI Button 🚀</Button>
      </div>
    </main>
  );
}