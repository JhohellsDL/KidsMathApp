import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { AdBanner } from '../../src/ui/components/AdBanner';
import { AdConfig } from '../../src/utils/ads';

describe('AdBanner Component (Families Policy Compliance)', () => {
  afterEach(() => {
    AdConfig.SHOW_BANNER = true;
  });

  it('renders explicit ad label (PUBLICIDAD) by default', () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<AdBanner />);
    });

    const root = renderer!.root;
    const textElements = root.findAllByType(Text);
    const labelFound = textElements.some(el => el.props.children === 'PUBLICIDAD');
    expect(labelFound).toBe(true);
  });

  it('allows custom explicit label', () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<AdBanner label="ANUNCIO" />);
    });

    const root = renderer!.root;
    const textElements = root.findAllByType(Text);
    const labelFound = textElements.some(el => el.props.children === 'ANUNCIO');
    expect(labelFound).toBe(true);
  });

  it('renders nothing when AdConfig.SHOW_BANNER is false', () => {
    AdConfig.SHOW_BANNER = false;
    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<AdBanner />);
    });

    expect(renderer!.toJSON()).toBeNull();
  });
});
