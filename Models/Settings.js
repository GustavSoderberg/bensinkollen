class Settings {

    ApiKeyGoogle = "AIzaSyA4E_orvod_psmMs34Hynr8QWWV-yoZIeQ"
    RadiusConstant = 5
    RadiusCircle = 1000*this.RadiusConstant
    LatDelta = 0.04*this.RadiusConstant
    LngDelta = 0.04*this.RadiusConstant
    LogoWidth = 6.25*this.RadiusConstant
    LogoHeight = (10.825)*this.RadiusConstant
    

}

const settings = new Settings()

export { settings }