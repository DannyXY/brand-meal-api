import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "../auth/decorator/index";
import { JwtGuard } from "../auth/guard/index";
import { BrandsService } from "./brands.service";
import { UserModel } from "../database/models/user.model";
import { BrandDto, UpdateCat } from "./brand.dto";
import { AddonDto } from "../addons/addon.dto";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller("brands")
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiTags("Brand")
  async findAll() {
    try {
      return this.brandsService.findAll().eager("[addons]");
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  @ApiTags("Brand")
  async findOne(@Param("id", new ParseIntPipe()) id: number) {
    try {
      const note = await this.brandsService.findOne(id);
      await note.$loadRelated("[addons]");
      return note;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiTags("Brand")
  async create(@Body() props: BrandDto, @GetUser() user: UserModel) {
    try {
      return this.brandsService.create(props, user);
    } catch (error) {
      throw error;
    }
  }

  @Delete(":id")
  @ApiTags("Brand")
  async delete(
    @Param("id", new ParseIntPipe()) id: number,
    @GetUser() user: UserModel
  ) {
    try {
      return this.brandsService.delete(id, user);
    } catch (error) {
      throw error;
    }
  }

  @Patch(":id/addon-categories")
  @ApiTags("Brand")
  async addCategory(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() props: UpdateCat,
    @GetUser() user: UserModel
  ) {
    try {
      return this.brandsService.addCategory(id, props.category, user);
    } catch (error) {
      throw error;
    }
  }

  @Get(":id/addons")
  @ApiTags("Addon")
  async getBrandAddons(@Param("id", new ParseIntPipe()) id: number) {
    try {
      return this.brandsService.getAddons(id);
    } catch (error) {
      throw error;
    }
  }
  @Post(":id/addons")
  @ApiTags("Addon")
  async createAddon(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() props: AddonDto,
    @GetUser() user: UserModel
  ) {
    try {
      return this.brandsService.addAddon(id, props, user);
    } catch (error) {
      throw error;
    }
  }
  @Get(":brandId/addons/:addonId")
  @ApiTags("Addon")
  async getSingleAddon(
    @Param("brandId", new ParseIntPipe()) brandId: number,
    @Param("addonId", new ParseIntPipe()) addonId: number
  ) {
    try {
      return this.brandsService.getSingleBrandAddon(brandId, addonId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(":brandId/addons/:addonId")
  @ApiTags("Addon")
  async deleteSingleAddon(
    @Param("brandId", new ParseIntPipe()) brandId: number,
    @Param("addonId", new ParseIntPipe()) addonId: number,
    @GetUser() user: UserModel
  ) {
    try {
      return this.brandsService.removeAddon(addonId, brandId, user);
    } catch (error) {
      throw error;
    }
  }
}
