// not efficient at all but i can maybe fix it later
radio.onReceivedString(function (receivedString) {
    if (receivedString == "left") {
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
        hummingbird.setRotationServo(FourPort.One, -100)
        hummingbird.setRotationServo(FourPort.Two, -100)
        hummingbird.setTriLED(
        TwoPort.One,
        0,
        100,
        0
        )
        basic.pause(500)
        hummingbird.setRotationServo(FourPort.One, 0)
        hummingbird.setRotationServo(FourPort.Two, 0)
        hummingbird.setTriLED(
        TwoPort.One,
        100,
        0,
        0
        )
    }
    if (receivedString == "right") {
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            `)
        hummingbird.setRotationServo(FourPort.One, 100)
        hummingbird.setRotationServo(FourPort.Two, 100)
        hummingbird.setTriLED(
        TwoPort.Two,
        0,
        100,
        0
        )
        basic.pause(500)
        hummingbird.setRotationServo(FourPort.One, 0)
        hummingbird.setRotationServo(FourPort.Two, 0)
        hummingbird.setTriLED(
        TwoPort.Two,
        100,
        0,
        0
        )
    }
    if (receivedString == "forward") {
        hummingbird.setRotationServo(FourPort.One, -100)
        hummingbird.setTriLED(
        TwoPort.One,
        100,
        100,
        100
        )
        hummingbird.setRotationServo(FourPort.Two, 100)
        hummingbird.setTriLED(
        TwoPort.Two,
        100,
        100,
        100
        )
    }
    if (receivedString == "battery dying") {
        serial.writeLine("may loose connection soon, counterpart dying")
    }
})
input.onGesture(Gesture.FreeFall, function () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
    music.playTone(349, music.beat(BeatFraction.Breve))
})
input.onGesture(Gesture.ScreenDown, function () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    music.playTone(131, music.beat(BeatFraction.Breve))
    hummingbird.setTriLED(
    TwoPort.One,
    0,
    0,
    0
    )
    hummingbird.setTriLED(
    TwoPort.Two,
    0,
    0,
    0
    )
    basic.pause(1000)
    basic.showString("Fatal ERROR")
})
// really wish there was a way to group these under
// one script
input.onButtonPressed(Button.A, function () {
    radio.sendString("left")
    if (left == "true") {
        left = "false"
        hummingbird.setTriLED(
        TwoPort.Two,
        100,
        0,
        0
        )
    } else {
        left = "true"
        hummingbird.setTriLED(
        TwoPort.Two,
        0,
        100,
        0
        )
    }
    basic.showLeds(`
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        `)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("forward")
    basic.showLeds(`
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        `)
    hummingbird.setTriLED(
    TwoPort.Two,
    100,
    100,
    100
    )
    hummingbird.setTriLED(
    TwoPort.One,
    100,
    100,
    100
    )
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("right")
    if (right == "true") {
        right = "false"
        hummingbird.setTriLED(
        TwoPort.One,
        100,
        0,
        0
        )
    } else {
        right = "true"
        hummingbird.setTriLED(
        TwoPort.One,
        0,
        100,
        0
        )
    }
    basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        `)
})
let right = ""
let left = ""
hummingbird.startHummingbird()
hummingbird.setTriLED(
TwoPort.One,
0,
0,
50
)
hummingbird.setTriLED(
TwoPort.Two,
0,
0,
50
)
basic.showLeds(`
    . # . # .
    # . . . #
    . . . . .
    # . . . #
    . # . # .
    `)
serial.writeLine("loading please wait")
basic.showIcon(IconNames.SmallSquare)
music.playTone(196, music.beat(BeatFraction.Quarter))
music.rest(music.beat(BeatFraction.Sixteenth))
music.playTone(196, music.beat(BeatFraction.Quarter))
basic.showIcon(IconNames.Square)
radio.sendString(control.deviceName())
hummingbird.setTriLED(
TwoPort.One,
0,
0,
50
)
hummingbird.setTriLED(
TwoPort.Two,
0,
0,
50
)
serial.writeString("autocar os build 14719.3")
control.inBackground(function () {
    if (hummingbird.getBattery() <= 50) {
        basic.showString("low battery")
        serial.writeLine("battery low, will shut down soon")
        radio.sendString("battery dying")
    }
})
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) <= 5) {
        hummingbird.setRotationServo(FourPort.Two, -100)
        hummingbird.setRotationServo(FourPort.One, 100)
        control.waitMicros(1000000)
        hummingbird.setRotationServo(FourPort.One, 0)
        hummingbird.setRotationServo(FourPort.Two, 0)
        hummingbird.setTriLED(
        TwoPort.Two,
        50,
        0,
        0
        )
        left = "false"
        hummingbird.setTriLED(
        TwoPort.One,
        50,
        0,
        0
        )
        right = "false"
    }
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.Two) <= 5) {
        hummingbird.setRotationServo(FourPort.Two, 100)
        hummingbird.setRotationServo(FourPort.One, -100)
        control.waitMicros(1000000)
        hummingbird.setRotationServo(FourPort.One, 0)
        hummingbird.setRotationServo(FourPort.Two, 0)
        hummingbird.setTriLED(
        TwoPort.Two,
        50,
        0,
        0
        )
        left = "false"
        hummingbird.setTriLED(
        TwoPort.One,
        50,
        0,
        0
        )
        right = "false"
    }
})
