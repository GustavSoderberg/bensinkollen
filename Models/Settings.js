class Settings {

    ApiKeyGoogle = "AIzaSyD277SAgiNn-6NP0r3hFPzpduhVc2IVsxY"
    RadiusConstant = 5
    RadiusCircle = 1000*this.RadiusConstant
    LatDelta = 0.04*this.RadiusConstant
    LngDelta = 0.04*this.RadiusConstant
    LogoWidth = 6.25*this.RadiusConstant
    LogoHeight = (10.825)*this.RadiusConstant
    

}

const settings = new Settings()

export { settings }