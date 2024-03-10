import {
  PipelineType,
  ZeroShotClassificationOutput,
  ZeroShotClassificationPipeline,
} from "@xenova/transformers";

export class MyZeroShotClassificationPipeline {
  static task: PipelineType = "zero-shot-classification";
  static model = "MoritzLaurer/mDeBERTa-v3-base-xnli-multilingual-nli-2mil7";
  static instance: ZeroShotClassificationPipeline;

  static async getInstance(
    progress_callback: Function | undefined = undefined
  ) {
    if (!this.instance) {
      console.log(
        "학습된 pipeline을 찾을 수 없습니다. 새로운 pipeline을 생성합니다."
      );
      const { pipeline } = await import("@xenova/transformers");
      this.instance = (await pipeline(this.task, this.model, {
        progress_callback,
      })) as unknown as ZeroShotClassificationPipeline;
    }
    return this.instance;
  }

  static async classifyCategory(text: string, categoryList: string[]) {
    if (!this.instance) {
      console.error(
        "pipeline을 찾을 수 없습니다. 새로운 pipeline을 생성합니다."
      );
      await this.getInstance();
    }
    console.log(this.instance);
    const result = (await this.instance(
      text,
      categoryList
    )) as ZeroShotClassificationOutput;
    return result;
  }
}

MyZeroShotClassificationPipeline.getInstance();