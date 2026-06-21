import type { Schema, Struct } from '@strapi/strapi';

export interface BannerHeroHeroPrincipal extends Struct.ComponentSchema {
  collectionName: 'components_banner_hero_hero_principals';
  info: {
    displayName: 'hero-principal';
  };
  attributes: {
    heading: Schema.Attribute.String;
    imagenbanner: Schema.Attribute.Media<'files' | 'images', true> &
      Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'banner-hero.hero-principal': BannerHeroHeroPrincipal;
    }
  }
}
