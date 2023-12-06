export class OrderController {
  private machines: Machine[] = [];

  registerMachine(machine: Machine) {
    this.machines.push(machine);
  }

  unregisterMachine(machine: Machine) {
    const machineIndex = this.machines.indexOf(machine);
    machine.resetMachine();
    this.machines.splice(machineIndex, 1);
  }

  setState(state: string) {
    if (!this.machines.length) throw "Invalid state provided";

    this.machines.forEach((machine) => {
      machine.produce(state);
    });
  }
}

export class Machine {
  public state: string | null = null;
  private audit: string[] = [];

  produce(state: string | null) {
    this.state = state;
    this.audit.push(`Order #${this.audit.length + 1} - ${this.state}`);
  }

  performAudit() {
    return this.audit;
  }

  resetMachine() {
    this.state = null;
    this.audit = [];
  }
}
