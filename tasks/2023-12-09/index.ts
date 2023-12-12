export interface ITool {
  init: () => void;
  update: () => void;
  dispose: () => void;
}

export class Equipment {
  private toolsInitialized = false;
  private tools: Tool[] = [];

  registerTools(tool: ITool) {
    this.tools.push(new Tool(tool));
  }

  initializeTools() {
    this.tools.forEach((tool) => tool.initializeTools());
    this.toolsInitialized = true;
  }

  updateTools() {
    if (!this.toolsInitialized) {
      throw "Cannot update any tools before initialization.";
    }

    this.tools.forEach((tool) => tool.updateTools());
  }

  disposeTools() {
    this.tools.forEach((tool) => tool.disposeTools());
  }
}

class Tool extends Equipment {
  constructor(private tool: ITool) {
    super();
    this.initializeTools = this.tool.init;
    this.updateTools = this.tool.update;
    this.disposeTools = this.tool.dispose;
  }
}
