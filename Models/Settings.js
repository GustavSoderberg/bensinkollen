class Settings {

    ApiKeyGoogle = "AIzaSyA4E_orvod_psmMs34Hynr8QWWV-yoZIeQ"
    RadiusConstant = 1
    RadiusCircle = 1000*this.RadiusConstant
    LatDelta = 0.04*this.RadiusConstant
    LngDelta = 0.04*this.RadiusConstant
    LogoWidth = 25
    LogoHeight = 43.3
    

}

const settings = new Settings()

export { settings }