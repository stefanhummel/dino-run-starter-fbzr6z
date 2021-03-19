export class Sounds {
  public static dinoJumpSound = new Audio(
    "https://raw.githubusercontent.com/female-coders-linz/workshops/master/t-rex-run/assets/dino-jump.ogx"
  );

  public static gameOverSound = new Audio(
    "https://raw.githubusercontent.com/female-coders-linz/workshops/master/t-rex-run/assets/game-over.ogx"
  );

  public static playDinoJumpSound() {
    Sounds.dinoJumpSound.play();
  }

  public static playGameOverSound() {
    Sounds.gameOverSound.play();
  }
}
