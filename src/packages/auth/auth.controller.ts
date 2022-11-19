import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ContentType, SwaggerTags } from "src/common/enums/swagger.enum";
import AuthService from "./auth.service";
import LoginDTO from "./dto/login.dto";
import RegisterDTO from "./dto/register.dto";

@Controller("auth")
@ApiTags(SwaggerTags.AUTHORIZATION)
export default class AuthController {
  constructor(private authService: AuthService){}
  @Post("/login")
  @ApiConsumes(ContentType.URL_ENCODED, ContentType.JSON)
  async login(@Body() body: LoginDTO){
    const loginResult = await this.authService.login(body);
    return {
      statusCode: HttpStatus.OK,
      data: loginResult
    }
  }
  @Post("/register")
  @ApiConsumes(ContentType.URL_ENCODED, ContentType.JSON)
  async register(@Body() body: RegisterDTO){
    const user = await this.authService.register(body)
    return {
      statusCode: HttpStatus.CREATED,
      message: "you signedup successfully you can login on your account",
      data: user
    }
  }
}